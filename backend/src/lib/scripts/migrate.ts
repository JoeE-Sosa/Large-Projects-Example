import { sequelizeDatabase } from '@/interfaces/database/sequelize/sequelize.database'

async function migrate() {
  try {
    await sequelizeDatabase.migrate()
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    process.exit(1)
  }
}

await migrate()
