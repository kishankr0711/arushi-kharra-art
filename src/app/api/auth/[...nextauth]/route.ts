// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Admin Login',
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         // Simple admin check (use env vars in production!)
//         if (credentials?.username === "admin" && 
//             credentials?.password === process.env.ADMIN_PASSWORD) {
//           return { id: "1", name: "Admin", email: "admin@inkara.com" };
//         }
//         return null;
//       }
//     })
//   ]
// });

// export { handler as GET, handler as POST };

import { GET, POST } from "@/auth"
export { GET, POST }

// import { handlers } from "@/auth"
// export const { GET, POST } = handlers

// import { handlers } from "@/auth"

// export const { GET, POST } = handlers

