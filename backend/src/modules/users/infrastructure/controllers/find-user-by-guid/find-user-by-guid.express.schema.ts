import { z } from 'zod'
import { ValidationErrorResponse } from '@/interfaces/server/express/express.responses'
import type { NextFunction, Request, Response } from 'express'

const FindUserByGuidSchema = z.object({
  query: z.object({
    guid: z.string(),
  }),
})

export const ValidateFindUserByGuid = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = FindUserByGuidSchema.safeParse(req)
  if (!success) return ValidationErrorResponse(res)
  req.validData = data.query
  next()
}
