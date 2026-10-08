import { apiExpress } from './interfaces/server/express/express.api'
import { apiFastify } from './interfaces/server/fastify/fastify.api'

import { sequelizeDatabase } from './interfaces/database/sequelize/sequelize.database'
import { drizzleDatabase } from './interfaces/database/drizzle/database'
import { prismaDatabase } from './interfaces/database/prisma/database'

async function ConnectInterfaces() {
  await apiExpress.connect()
  // await apiFastify.connect()
  await sequelizeDatabase.connect()
  // await drizzleDatabase.connect()
  // await prismaDatabase.connect()
}

async function DisconnectInterfaces() {
  await apiExpress.disconnect()
  // await apiFastify.disconnect()
  await sequelizeDatabase.disconnect()
  // await drizzleDatabase.disconect()
  // await prismaDatabase.disconnect()
}

async function main() {
  try {
    console.info('\n🔄 - Iniciando servidor...')
    await ConnectInterfaces()
    console.info('\n✅ - Servidor iniciado correctamente.')
  } catch (error) {
    console.info('\n🔄 - Desconectando servidor...')
    await DisconnectInterfaces()
    if (error instanceof Error) console.error(error.message)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  console.info('\n🔄 - Desconectando servidor...')
  await DisconnectInterfaces()
  console.info('\n🔽 - El servidor ha sido detenido correctamente.')
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.info('\n🔄 - Desconectando servidor...')
  await DisconnectInterfaces()
  console.info('\n🔽 - El servidor ha sido detenido correctamente.')
  process.exit(0)
})

process.on('uncaughtException', async (error) => {
  console.info('\n🔄 - Desconectando servidor...')
  await DisconnectInterfaces()
  console.error('\n❌ - Se ha producido un error no controlado:', error)
  process.exit(1)
})

process.on('unhandledRejection', async (error) => {
  console.info('\n🔄 - Desconectando servidor...')
  await DisconnectInterfaces()
  console.error('\n❌ - Se ha producido un error no controlado:', error)
  process.exit(1)
})

await main()
