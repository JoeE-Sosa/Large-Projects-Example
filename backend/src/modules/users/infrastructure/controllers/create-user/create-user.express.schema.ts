import { z } from 'zod'

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
    name: z.string(),
    department: z.string(),
  }),
})

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>
