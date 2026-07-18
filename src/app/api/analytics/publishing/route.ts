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
    
    // Calculate date range
    const now = new Date();
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

    // Get publishing logs
    const publishingLogs = await prisma.publishingLog.findMany({
      where: {
        userId: user.id,
        createdAt: { gte: startDate },
      },
      include: {
        content: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get platform statistics
    const platformStats = await prisma.publishingLog.groupBy({
      by: ["platform"],
      where: {
        userId: user.id,
        createdAt: { gte: startDate },
      },
      _count: {
        id: true,
      },
    });

    const platformData = platformStats.map((item) => ({
      platform: item.platform,
      count: item._count.id,
    }));

    // Get status statistics
    const statusStats = await prisma.publishingLog.groupBy({
      by: ["status"],
      where: {
        userId: user.id,
        createdAt: { gte: startDate },
      },
      _count: {
        id: true,
      },
    });

    const statusData = statusStats.map((item) => ({
      status: item.status,
      count: item._count.id,
    }));

    const logs = publishingLogs.map((log) => ({
      id: log.id,
      contentId: log.contentId,
      contentTitle: log.content.title,
      platform: log.platform,
      status: log.status,
      errorMessage: log.errorMessage,
      publishedAt: log.publishedAt,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({
      logs,
      platformStats: platformData,
      statusStats: statusData,
    });
  } catch (error) {
    console.error("Publishing logs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
