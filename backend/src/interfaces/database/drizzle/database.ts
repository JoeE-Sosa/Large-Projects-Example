import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql'
import { drizzleConfig } from './config.ts'
import type { Client } from '@libsql/client'

class DrizzleDatabase {
  private readonly databaseFile

  public instance: (LibSQLDatabase<Record<string, never>> & { $client: Client }) | undefined

  constructor() {
    const { DRIZZLE_DB_SQLITE_FILE } = drizzleConfig
    this.databaseFile = DRIZZLE_DB_SQLITE_FILE
  }

  async connect() {
    this.instance = drizzle(this.databaseFile)
  }

  async disconect() {
    this.instance = undefined
  }
}

export const drizzleDatabase = new DrizzleDatabase()
