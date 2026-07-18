import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const range = request.nextUrl.searchParams.get("range") || "30days";
    const format = request.nextUrl.searchParams.get("format") || "csv";
    
    // Calculate date range
    let startDate = new Date();
    
    switch (range) {
      case "24hours":
        startDate.setHours(startDate.getHours() - 24);
        break;
      case "7days":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "all":
        startDate = new Date(0);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    // Get all analytics data
    const contentAnalytics = await prisma.contentAnalytics.findMany({
      where: {
        userId: user.id,
        createdAt: { gte: startDate },
      },
      include: {
        content: {
          select: {
            title: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (format === "csv") {
      // Generate CSV
      const headers = ["Date", "Title", "Type", "Platform", "Views", "Likes", "Shares", "Comments", "Engagement"];
      const rows = contentAnalytics.map((item) => [
        item.createdAt.toISOString().split('T')[0],
        `"${item.content.title}"`,
        item.content.type,
        item.platform || "N/A",
        item.views,
        item.likes,
        item.shares,
        item.comments,
        item.views + item.likes + item.shares + item.comments,
      ]);

      const csv = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="analytics-${range}.csv"`,
        },
      });
    } else if (format === "pdf") {
      // Generate simple PDF-like response
      // In production, use a library like pdfkit or puppeteer
      const pdfContent = `
My Content Brain Analytics Report
${new Date().toLocaleDateString()}

Summary:
- Total Content: ${contentAnalytics.length}
- Date Range: ${range}

Content Performance:
${contentAnalytics
  .slice(0, 10)
  .map(
    (item) =>
      `Title: ${item.content.title}
Type: ${item.content.type}
Platform: ${item.platform || "N/A"}
Views: ${item.views} | Likes: ${item.likes} | Shares: ${item.shares} | Comments: ${item.comments}
---`
  )
  .join("\n")}
      `;

      return new NextResponse(pdfContent, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="analytics-${range}.txt"`,
        },
      });
    }

    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
