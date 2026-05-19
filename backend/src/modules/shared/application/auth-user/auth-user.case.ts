import { Result } from '@/modules/shared/domain/patterns/result.pattern.ts'
import type { AuthUserDTO } from './auth-user.dto.ts'
import type { SessionServiceContract } from '@/modules/shared/domain/contracts/session.service.contract.ts'
import type { AuthUserType } from '@/modules/shared/domain/types/auth.type.ts'

export class AuthUserUseCase {
  private readonly sessionService: SessionServiceContract

  constructor(sessionService: SessionServiceContract) {
    this.sessionService = sessionService
  }

  async execute(data: AuthUserDTO): Promise<Result<AuthUserType>> {
    try {
      const { token } = data
      if (!token) return Result.Fail('Token is invalid.')

      const verifyResult = await this.sessionService.verifySession(token)
      if (!verifyResult.IsSuccess()) return Result.Fail(verifyResult.GetError())

      const authUser = verifyResult.GetValue()

      return Result.Ok(authUser)
    } catch (error) {
      return Result.Fail('')
    }
  }
}
