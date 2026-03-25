// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "@/prisma/client"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import bcrypt from "bcryptjs"

// // Admin emails - change these to your admin emails
// const ADMIN_EMAILS = [
//   "Arushikharra.art@gmail.com",
//   "kishankr0711@gmail.com", // Add your email here
// ]

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//         })

//         if (!user || !user.password) {
//           return null
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         )

//         if (!isPasswordValid) {
//           return null
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           image: user.image,
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.role = user.role
//         token.id = user.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string
//         session.user.role = token.role as string
//       }
//       return session
//     },
//     async signIn({ user, account, profile }) {
//       // If signing in with Google, check if admin
//       if (account?.provider === "google") {
//         const email = user.email
        
//         // Check if user exists
//         const existingUser = await prisma.user.findUnique({
//           where: { email: email! },
//         })

//         if (existingUser) {
//           // Update role if email is in admin list
//           if (ADMIN_EMAILS.includes(email!)) {
//             await prisma.user.update({
//               where: { email: email! },
//               data: { role: "admin" },
//             })
//             user.role = "admin"
//           } else {
//             user.role = existingUser.role
//           }
//         } else {
//           // New Google user - create account
//           const role = ADMIN_EMAILS.includes(email!) ? "admin" : "user"
//           await prisma.user.create({
//             data: {
//               email: email!,
//               name: user.name,
//               image: user.image,
//               role: role,
//             },
//           })
//           user.role = role
//         }
//       }
//       return true
//     },
//     async redirect({ url, baseUrl }) {
//       // Redirect admin to dashboard, users to home
//       if (url.includes("/api/auth/callback") || url === baseUrl) {
//         return baseUrl
//       }
//       return url.startsWith(baseUrl) ? url : baseUrl
//     },
//   },
// })

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/client"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"

const ADMIN_EMAILS = [
  "arushikharra.art@gmail.com",
  "kishankr0711@gmail.com",
]

const isEdgeRuntime = () =>
  typeof (globalThis as { EdgeRuntime?: string }).EdgeRuntime !== "undefined"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const normalizedEmail = (credentials.email as string).trim().toLowerCase()

        const user = await prisma.user.findFirst({
          where: {
            email: {
              equals: normalizedEmail,
              mode: "insensitive",
            },
          },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }

      // Keep token role/id aligned with database so manual role changes
      // (e.g. via Supabase/Prisma) take effect without auth edge cases.
      if (!isEdgeRuntime() && token.email) {
        try {
          const dbUser = await prisma.user.findFirst({
            where: {
              email: {
                equals: token.email,
                mode: "insensitive",
              },
            },
            select: { id: true, role: true },
          })

          if (dbUser) {
            token.role = dbUser.role
            token.id = dbUser.id
          }
        } catch {
          // In non-critical sync failures, keep existing token data.
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = (token.role as string) ?? "user"
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const normalizedEmail = user.email?.trim().toLowerCase()
        if (!normalizedEmail) return false
        
        const existing = await prisma.user.findFirst({
          where: {
            email: {
              equals: normalizedEmail,
              mode: "insensitive",
            },
          },
        })

        if (existing) {
          if (ADMIN_EMAILS.includes(normalizedEmail)) {
            await prisma.user.update({
              where: { id: existing.id },
              data: { role: "admin" },
            })
            user.role = "admin"
          } else {
            user.role = existing.role
          }
        } else {
          const role = ADMIN_EMAILS.includes(normalizedEmail) ? "admin" : "user"
          await prisma.user.create({
            data: {
              email: normalizedEmail,
              name: user.name,
              image: user.image,
              role,
            },
          })
          user.role = role
        }
      }
      return true
    },
  },
})
