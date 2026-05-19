import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// @ts-expect-error
const { DRIZZLE_DB_SQLITE_FILE } = process.env

export default defineConfig({
  out: './src/services/database/drizzle/migrations',
  schema: './src/services/database/drizzle/schema',
  dialect: 'sqlite',
  dbCredentials: {
    url: DRIZZLE_DB_SQLITE_FILE!,
  },
  migrations: {
    prefix: 'timestamp',
    schema: 'public',
  },
})
