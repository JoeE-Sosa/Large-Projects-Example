import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
const AuthUserSchema = z.object({
  cookies: z.object({
    token: z.string(),
  }),
})

export const ValidateAuthUser = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = AuthUserSchema.safeParse(req)
  if (!success) return res.status(400)
  req.validCookies = data
  next()
}
