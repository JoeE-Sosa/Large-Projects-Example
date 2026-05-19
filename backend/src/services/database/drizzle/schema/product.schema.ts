import { sql } from 'drizzle-orm'
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const ProductsTable = sqliteTable('Products', {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  sku: text().notNull(),
  name: text().notNull(),
  price: real().notNull(),
  description: text().notNull(),
  disabled: integer({ mode: 'boolean' }).default(false).notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
})
