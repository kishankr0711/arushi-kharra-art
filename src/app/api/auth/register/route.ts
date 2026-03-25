// // import { prisma } from "../../../../../prisma/client"
// // import bcrypt from "bcryptjs"
// // import { NextResponse } from "next/server"

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json()
// //     const { name, email, password } = body

// //     console.log("Registering:", { name, email })

// //     if (!name || !email || !password) {
// //       return NextResponse.json(
// //         { error: "Missing fields" },
// //         { status: 400 }
// //       )
// //     }

// //     // Check existing user
// //     const existing = await prisma.user.findUnique({
// //       where: { email },
// //     })

// //     if (existing) {
// //       return NextResponse.json(
// //         { error: "User already exists" },
// //         { status: 409 }
// //       )
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10)

// //     // Create user
// //     const user = await prisma.user.create({
// //       data: {
// //         name,
// //         email,
// //         password: hashedPassword,
// //         role: "user",
// //       },
// //     })

// //     console.log("Created user:", user.id)

// //     return NextResponse.json({
// //       id: user.id,
// //       email: user.email,
// //       name: user.name,
// //     })
// //   } catch (error) {
// //     console.error("Register error:", error)
// //     return NextResponse.json(
// //       { error: "Failed to create user", details: (error as Error).message },
// //       { status: 500 }
// //     )
// //   }
// // }

// // import { prisma } from "../../../../../prisma/client"
// // import bcrypt from "bcryptjs"
// // import { NextResponse } from "next/server"

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json()
// //     const { name, email, password } = body

// //     console.log("Registering:", { name, email })

// //     // Check if prisma is loaded
// //     if (!prisma || !prisma.user) {
// //       console.error("Prisma not initialized:", prisma)
// //       return NextResponse.json(
// //         { error: "Database not connected" },
// //         { status: 500 }
// //       )
// //     }

// //     if (!name || !email || !password) {
// //       return NextResponse.json(
// //         { error: "Missing fields" },
// //         { status: 400 }
// //       )
// //     }

// //     // Check existing user
// //     const existing = await prisma.user.findUnique({
// //       where: { email },
// //     })

// //     if (existing) {
// //       return NextResponse.json(
// //         { error: "User already exists" },
// //         { status: 409 }
// //       )
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10)

// //     // Create user
// //     const user = await prisma.user.create({
// //       data: {
// //         name,
// //         email,
// //         password: hashedPassword,
// //         role: "user",
// //       },
// //     })

// //     console.log("Created user:", user.id)

// //     return NextResponse.json({
// //       id: user.id,
// //       email: user.email,
// //       name: user.name,
// //     })
// //   } catch (error) {
// //     console.error("Register error:", error)
// //     return NextResponse.json(
// //       { error: "Failed to create user", details: (error as Error).message },
// //       { status: 500 }
// //     )
// //   }
// // }

// import { prisma } from "../../../../../prisma/client"
// import bcrypt from "bcryptjs"
// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json()

//     const existing = await prisma.user.findUnique({ where: { email } })
//     if (existing) {
//       return NextResponse.json({ error: "User exists" }, { status: 409 })
//     }

//     const hashed = await bcrypt.hash(password, 10)
//     const user = await prisma.user.create({
//       data: { name, email, password: hashed, role: "user" },
//     })

//     return NextResponse.json({ id: user.id, email: user.email, name: user.name })
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed" }, { status: 500 })
//   }
// }

import { prisma } from "@/prisma/client"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

// Admin emails - must match exactly what's in auth.ts
const ADMIN_EMAILS = [
  "arushikharra.art@gmail.com",
  "kishankr0711@gmail.com",
  "admin@gmail.com",
]

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    console.log("Registering:", email) // Debug log

    // Check if user exists
    const existing = await prisma.user.findUnique({ 
      where: { email } 
    })
    
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" }, 
        { status: 409 }
      )
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10)

    // Check if email should be admin
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase())
    console.log("Is admin:", isAdmin) // Debug log

    // Create user with appropriate role
    const user = await prisma.user.create({
      data: { 
        name, 
        email: email.toLowerCase(), // Store lowercase
        password: hashed, 
        role: isAdmin ? "admin" : "user" // Set role based on email
      },
    })

    console.log("Created user with role:", user.role) // Debug log

    return NextResponse.json({ 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role 
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { error: "Failed to create user" }, 
      { status: 500 }
    )
  }
}
