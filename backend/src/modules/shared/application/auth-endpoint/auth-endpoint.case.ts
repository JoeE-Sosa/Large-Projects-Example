import { USER_ROLES, USER_ROLES_LEVELS } from '@/lib/constants/user-roles'
import { Result } from '@/modules/shared/domain/patterns/result.pattern.ts'
import type { AuthEndpointDTO } from '@/modules/shared/application/auth-endpoint/auth-endpoint.dto.ts'

export class AuthEndpointUseCase {
  async execute(data: AuthEndpointDTO): Promise<Result<void>> {
    try {
      const { minRole, user } = data
      if (!user || !minRole) return Result.Fail('User or minimun role not defined.')

      if (USER_ROLES_LEVELS[user.role] < USER_ROLES_LEVELS[minRole as USER_ROLES])
        return Result.Fail('User not authorized with this endpoint.')

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail('Authorization has failed.')
    }
  }
}
