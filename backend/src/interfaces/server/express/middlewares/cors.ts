import cors from 'cors'
import { config } from '../../config'

export const corsMiddleware = () => {
  const { ALLOWED_ORIGINS } = config

  const isOriginAllowed = (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  }

  return cors({
    origin: isOriginAllowed,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
}
