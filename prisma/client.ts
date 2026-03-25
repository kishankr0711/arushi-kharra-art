// import { PrismaClient } from "@prisma/client";  // Note: /client at end
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";

// // Create PostgreSQL pool
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Create adapter
// const adapter = new PrismaPg(pool);

// // Singleton pattern
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({
//   adapter,  // REQUIRED in Prisma 7+
// });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// import { PrismaClient } from "@prisma/client"

// // For Edge Runtime (middleware) - basic client
// const globalForPrisma = globalThis as unknown as {
//   prismaEdge: PrismaClient | undefined
//   prismaNode: PrismaClient | undefined
// }

// // Edge client (for middleware) - NO adapter
// export const prismaEdge = globalForPrisma.prismaEdge ?? new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// })

// if (process.env.NODE_ENV !== "production") globalForPrisma.prismaEdge = prismaEdge

// Node client (for API routes) - with adapter if needed
// We'll create this separately in API routes

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
