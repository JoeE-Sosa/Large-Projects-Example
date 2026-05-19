import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function GetRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(() => {}, { prefix: '/items' })
}
