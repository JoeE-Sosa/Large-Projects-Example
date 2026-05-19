import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const UsersTable = sqliteTable('Users', {
  guid: text().notNull(),
  name: text().notNull(),
  password: text(),
  role: text().notNull(),
  department: text().notNull(),
  disabled: integer({ mode: 'boolean' }).default(false).notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
})
