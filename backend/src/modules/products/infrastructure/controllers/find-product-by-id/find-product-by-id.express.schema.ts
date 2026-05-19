import { z } from 'zod'
import { ValidationErrorResponse } from '@/services/server/express/express.responses.ts'
import type { Request, Response, NextFunction } from 'express'

const FindProductByIdSchema = z.object({
  query: z.object({
    id: z.coerce.number().positive(),
  }),
})

export const ValidateFindProductById = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = FindProductByIdSchema.safeParse(req)
  if (!success) return ValidationErrorResponse(res)
  req.validData = data.query
  next()
}
