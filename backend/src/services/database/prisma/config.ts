const { PRISMA_DB_SQLITE_FILE = 'file:./local.db' } = process.env

export const prismaConfig = {
  PRISMA_DB_SQLITE_FILE,
}
