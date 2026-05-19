import { USER_ROLES } from '@/constants/user-roles.ts'
import type { SessionServiceContract } from '../../domain/contracts/session.service.contract.ts'
import { Result } from '../../domain/patterns/result.pattern.ts'
import type { AuthUserType } from '../../domain/types/auth.type.ts'

export class JwTService implements SessionServiceContract {
  async createSession(data: AuthUserType): Promise<Result<{ token: string }>> {
    try {
      return Result.Ok({ token: '' })
    } catch (error) {
      return Result.Fail('')
    }
  }

  async verifySession(token: string): Promise<Result<AuthUserType>> {
    try {
      return Result.Ok({ guid: '', role: USER_ROLES.ADMIN } as AuthUserType)
    } catch (error) {
      return Result.Fail('')
    }
  }
}
