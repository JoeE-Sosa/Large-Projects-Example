import { z } from 'zod'
import { ValidationErrorResponse } from '@/services/server/express/express.responses.ts'
import type { Request, Response, NextFunction } from 'express'

const updateUserSchema = z.object({
  query: z.object({
    guid: z.string(),
  }),
  body: z.object({
    name: z.string(),
    role: z.string(),
    department: z.string(),
  }),
})

export const ValidateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = updateUserSchema.safeParse(req)
  if (!success) return ValidationErrorResponse(res)
  req.validData = data
  next()
}
