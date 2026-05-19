import { apiExpress } from './services/server/express/express.api.ts'
import { apiFastify } from './services/server/fastify/fastify.api.ts'

import { sequelizeDatabase } from './services/database/sequelize/database.ts'
import { drizzleDatabase } from './services/database/drizzle/database.ts'
import { prismaDatabase } from './services/database/prisma/database.ts'

async function main() {
  try {
    await apiExpress.connect()
    // await apiFastify.connect()
    // await sequelizeDatabase.connect({ force: false })
    // await drizzleDatabase.connect()
    // await prismaDatabase.connect()
  } catch (error) {
    console.log(error)

    await apiExpress.disconnect()
    // await apiFastify.disconnect()
    // await sequelizeDatabase.disconnect()
    // await drizzleDatabase.disconect()
    // await prismaDatabase.disconnect()
  }
}

await main()
