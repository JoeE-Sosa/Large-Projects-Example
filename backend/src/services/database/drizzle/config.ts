const { DRIZZLE_DB_SQLITE_FILE = 'file:./local.db' } = process.env

export const drizzleConfig = {
  DRIZZLE_DB_SQLITE_FILE,
}
