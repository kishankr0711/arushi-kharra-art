// import { prisma } from "../../../../../prisma/client"
// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { email } = body

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email required" },
//         { status: 400 }
//       )
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     })

//     return NextResponse.json({ exists: !!user })
//   } catch (error) {
//     console.error("Check user error:", error)
//     return NextResponse.json(
//       { error: "Failed to check user" },
//       { status: 500 }
//     )
//   }
// }

// import { prisma } from "../../../../../prisma/client"
// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { email } = body

//     if (!prisma || !prisma.user) {
//       console.error("Prisma not initialized")
//       return NextResponse.json(
//         { error: "Database not connected" },
//         { status: 500 }
//       )
//     }

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email required" },
//         { status: 400 }
//       )
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     })

//     return NextResponse.json({ exists: !!user })
//   } catch (error) {
//     console.error("Check user error:", error)
//     return NextResponse.json(
//       { error: "Failed to check user", details: (error as Error).message },
//       { status: 500 }
//     )
//   }
// }

import { prisma } from "../../../../../prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })
    return NextResponse.json({ exists: !!user })
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}