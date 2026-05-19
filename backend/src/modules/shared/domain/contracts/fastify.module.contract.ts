import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export abstract class FastifyModuleContract {
  abstract execute(fastify: FastifyInstance, options: FastifyPluginOptions): any
}
