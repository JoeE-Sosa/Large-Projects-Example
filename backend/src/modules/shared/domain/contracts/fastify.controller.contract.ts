import type { FastifyReply, FastifyRequest } from 'fastify'

export abstract class FastifyControllerContract {
  abstract execute(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | undefined>
}
