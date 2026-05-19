import { ValidationErrorResponse } from '@/services/server/fastify/fastify.responses.ts'
import type { FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify'
import z from 'zod'

const disableUserSchema = z.object({
  query: z.object({
    id: z.coerce.number(),
  }),
})

export const ValidateDisableUser = async (request: FastifyRequest, reply: FastifyReply): preHandlerHookHandler => {
  const { success, data } = disableUserSchema.safeParse(request)
  if (!success) return ValidationErrorResponse(reply)
  request.validData = data.query
}
