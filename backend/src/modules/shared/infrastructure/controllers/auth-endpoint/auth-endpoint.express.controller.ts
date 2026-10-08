import type { USER_ROLES } from '@/lib/constants/user-roles'
import type { AuthEndpointUseCase } from '@/modules/shared/application/auth-endpoint/auth-endpoint.case.ts'
import { Result } from '@/modules/shared/domain/patterns/result.pattern.ts'
import type { NextFunction, Request, Response } from 'express'

export class AuthEndpointController {
  private readonly authEndpointUseCase: AuthEndpointUseCase

  constructor(authEndpointUseCase: AuthEndpointUseCase) {
    this.authEndpointUseCase = authEndpointUseCase
  }

  execute = (minRole: keyof typeof USER_ROLES) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user } = req
        if (!user) res.status(403)

        const result = await this.authEndpointUseCase.execute({ minRole, user })
        if (!result.IsSuccess()) return Result.Fail(result.GetError())

        next()
      } catch (error) {
        return res.status(500)
      }
    }
  }
}
