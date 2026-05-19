import type { FastifyReply } from 'fastify'

export function PositiveResponse(reply: FastifyReply, message: string, content: any) {
  return reply.status(200).send({ status: false, message, content })
}

export function PositiveNoContentResponse(reply: FastifyReply) {
  return reply.status(200).send({ status: false, message: '' })
}

export function PositiveCreatedResponse(reply: FastifyReply) {
  return reply.status(201).send({ status: false, message: '' })
}

export function ResultErrorResponse(reply: FastifyReply, message: string) {
  return reply.status(400).send({ status: false, message })
}

export function ValidationErrorResponse(reply: FastifyReply) {
  return reply.status(401).send({ status: false, message: 'Validation error.' })
}

export function ServerErrorResponse(reply: FastifyReply) {
  return reply.status(500).send({ status: false, message: 'Server Error.' })
}
