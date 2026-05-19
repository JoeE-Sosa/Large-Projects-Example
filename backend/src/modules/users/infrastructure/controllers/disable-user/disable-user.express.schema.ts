import z from 'zod'
import type { NextFunction, Request, Response } from 'express'
import { ValidationErrorResponse } from '@/services/server/express/express.responses.ts'

const disableUserSchema = z.object({
  query: z.object({
    id: z.coerce.number(),
  }),
})

export const ValidateDisableUser = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = disableUserSchema.safeParse(req)
  if (!success) return ValidationErrorResponse(res)
  req.validData = data.query
  next()
}
