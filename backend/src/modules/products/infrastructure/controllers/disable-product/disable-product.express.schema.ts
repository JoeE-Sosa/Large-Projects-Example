import { z } from 'zod'
import { ValidationErrorResponse } from '@/interfaces/server/express/express.responses'
import type { NextFunction, Request, Response } from 'express'

const DisableProductSchema = z.object({
  query: z.object({
    id: z.coerce.number().positive(),
  }),
})

export const ValidateDisableProduct = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = DisableProductSchema.safeParse(req)
  if (!success) return ValidationErrorResponse(res)
  req.validData = data.query
  next()
}
