import { NextResponse } from "next/server"
import { prisma } from "@/prisma/client"

export async function GET() {
  try {
    const paintings = await prisma.painting.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(paintings)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch paintings" },
      { status: 500 }
    )
  }
}
