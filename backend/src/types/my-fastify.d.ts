export {}

declare module 'fastify' {
  interface FastifyRequest {
    validData?: any
  }
}
