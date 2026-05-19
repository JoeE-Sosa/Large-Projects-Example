import type { Result } from '../patterns/result.pattern.ts'
import type { AuthUserType } from '../types/auth.type.ts'

export abstract class SessionServiceContract {
  abstract createSession(data: AuthUserType): Promise<Result<{ token: string }>>
  abstract verifySession(token: string): Promise<Result<AuthUserType>>
}
