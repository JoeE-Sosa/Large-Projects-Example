import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { prismaConfig } from './config.ts'
import { PrismaClient } from './generated/prisma/client.ts'
import type { GlobalOmitConfig } from './generated/prisma/internal/prismaNamespace.ts'
import type { DefaultArgs } from '@prisma/client/runtime/client'

class PrismaDatabase {
  private readonly databaseFile
  public instance: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs> | undefined

  constructor() {
    const { PRISMA_DB_SQLITE_FILE } = prismaConfig
    this.databaseFile = PRISMA_DB_SQLITE_FILE
  }

  async connect() {
    try {
      const adapter = new PrismaBetterSqlite3({ url: this.databaseFile })
      this.instance = new PrismaClient({ adapter })
      // this.instance.$connect()
      console.info('✅ - Prisma Database connection was successful.')
    } catch (error) {
      console.error('❌ - Prisma Database connection has failed.')
    }
  }

  async disconnect() {
    try {
      this.instance?.$disconnect()
      console.info('')
    } catch (error) {
      console.error('')
    }
  }
}

export const prismaDatabase = new PrismaDatabase()
