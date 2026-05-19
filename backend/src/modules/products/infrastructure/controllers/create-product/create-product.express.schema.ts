import { z } from 'zod'

import { ValidationErrorResponse } from '@/services/server/express/express.responses.ts'
import type { NextFunction, Request, Response } from 'express'

const CreateProductSchema = z.object({
  body: z.object({
    sku: z.string(),
    name: z.string(),
    price: z.coerce.number().positive(),
    description: z.string(),
  }),
})

export const ValidateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = CreateProductSchema.safeParse(req)
  if (!success) return ValidationErrorResponse(res)
  req.validData = data.body
  next()
}
