// lib/db.ts
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Prisma 7 + SQLite: 直接传 Config 给 PrismaLibSql
const adapter = new PrismaLibSql({
  url: 'file:./prisma/dev.db',
})

export const db = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db