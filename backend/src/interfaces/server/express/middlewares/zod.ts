import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { ValidationErrorResponse } from '../express.responses'

export function DataValidator(schema: z.ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { headers, params, query, body } = req
    const { success, data, error } = schema.safeParse({ headers, params, query, body })

    if (!success) {
      const errors = error.issues.map((issue) => ({
        field: String(issue.path.at(-1) ?? 'unknown'),
        message: issue.message,
      }))
      return ValidationErrorResponse(res, { errors })
    }

    req.validData = data
    next()
  }
}
