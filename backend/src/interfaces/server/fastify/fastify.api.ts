import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify'
import { ApiConfig } from '../config.ts'
import { GetRoutes } from '@/modules/routes.fastify.module.ts'

class FastifyServer {
  private readonly port: number
  private readonly api: FastifyInstance

  constructor() {
    const { port } = ApiConfig
    this.port = port

    this.api = Fastify({ logger: true })

    this.api.get('/api/v1', (_: FastifyRequest, reply: FastifyReply) => {
      return reply.status(200).send({ version: 'v1', server: 'Fastify', description: 'API Server de Ejemplo V1' })
    })

    this.api.register(GetRoutes)
  }

  async connect() {
    try {
      await this.api.listen({ port: this.port })
      console.info('✅ - ')
    } catch (error) {
      this.api.log.error(error)
      throw error
    }
  }

  async disconnect() {
    try {
      await this.api.close()
      console.info('✅ - ')
    } catch (error) {
      console.error('❌ - ')
    }
  }
}

export const apiFastify = new FastifyServer()
