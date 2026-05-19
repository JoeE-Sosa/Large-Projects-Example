import { z } from 'zod'
import type { NextFunction, Request, Response } from 'express'

const CreateUserSchema = z.object({
  body: z.object({
    name: z.string(),
    password: z.string(),
    role: z.string(),
    department: z.string(),
  }),
})

export const ValidateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { success, data } = CreateUserSchema.safeParse(req)
  if (!success) return res.status(400).send({ message: 'Invalid fields in the request.' })
  req.validData = data.body
  next()
}
