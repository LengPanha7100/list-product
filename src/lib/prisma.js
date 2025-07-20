import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Check if we're in a build environment or if DATABASE_URL is available
const isBuilding = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL
const isDevelopment = process.env.NODE_ENV === 'development'

// Lazy initialization of Prisma Client
function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    if (isBuilding) {
      // During build time without DATABASE_URL, return a mock client
      console.warn('DATABASE_URL not available during build time')
      globalForPrisma.prisma = new Proxy({}, {
        get() {
          throw new Error('Database not available during build time')
        }
      })
    } else {
      globalForPrisma.prisma = new PrismaClient({
        log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL || 'file:./dev.db'
          }
        }
      })
    }
  }
  return globalForPrisma.prisma
}

// Export a proxy that lazy-loads the Prisma client
export const prisma = new Proxy({}, {
  get(target, prop) {
    return getPrismaClient()[prop]
  }
}) 