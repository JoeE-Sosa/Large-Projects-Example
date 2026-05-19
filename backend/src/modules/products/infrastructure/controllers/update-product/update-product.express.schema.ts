import { ValidationErrorResponse } from '@/services/server/express/express.responses.ts'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const UpdateProductSchema = z.object({
  query: z.object({
    id: z.coerce.number().positive(),
  }),
  body: z.object({
    sku: z.string(),
    name: z.string(),
    price: z.coerce.number().positive(),
    description: z.string(),
  }),
})

export const ValidateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = UpdateProductSchema.safeParse(req)
  if (!success) return ValidationErrorResponse(res)
  req.validData = data
  next()
}
