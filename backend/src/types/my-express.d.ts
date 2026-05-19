import type { AuthUserType } from '@/modules/shared/domain/types/auth.type.ts'

declare global {
  namespace Express {
    interface Request {
      user: AuthUserType
      validData?: any
      validCookies?: any
    }
  }
}
