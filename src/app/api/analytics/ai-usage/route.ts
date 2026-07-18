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

    // Get AI usage logs grouped by model
    const aiUsage = await prisma.aIUsageLog.groupBy({
      by: ["model"],
      where: {
        userId: user.id,
        createdAt: { gte: startDate },
      },
      _count: {
        id: true,
      },
      _sum: {
        tokensUsed: true,
        estimatedCost: true,
      },
    });

    const usageData = aiUsage.map((item) => ({
      model: item.model,
      requests: item._count.id,
      tokensUsed: item._sum.tokensUsed || 0,
      estimatedCost: item._sum.estimatedCost || 0,
    }));

    // Get AI usage by request type
    const usageByType = await prisma.aIUsageLog.groupBy({
      by: ["requestType"],
      where: {
        userId: user.id,
        createdAt: { gte: startDate },
      },
      _count: {
        id: true,
      },
      _sum: {
        tokensUsed: true,
      },
    });

    const typeData = usageByType.map((item) => ({
      type: item.requestType,
      count: item._count.id,
      tokensUsed: item._sum.tokensUsed || 0,
    }));

    // Total stats
    const totalStats = await prisma.aIUsageLog.aggregate({
      where: {
        userId: user.id,
        createdAt: { gte: startDate },
      },
      _count: { id: true },
      _sum: { tokensUsed: true, estimatedCost: true },
    });

    return NextResponse.json({
      models: usageData,
      types: typeData,
      total: {
        requests: totalStats._count.id,
        tokensUsed: totalStats._sum.tokensUsed || 0,
        estimatedCost: totalStats._sum.estimatedCost || 0,
      },
    });
  } catch (error) {
    console.error("AI usage error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
