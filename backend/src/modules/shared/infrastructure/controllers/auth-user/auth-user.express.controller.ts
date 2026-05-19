import type { NextFunction, Request, Response } from 'express'
import type { ExpressMiddlewareContract } from '@/modules/shared/domain/contracts/express.middleware.contract.ts'
import type { AuthUserUseCase } from '@/modules/shared/application/auth-user/auth-user.case.ts'

export class AuthUserController implements ExpressMiddlewareContract {
  private readonly authUserUseCase: AuthUserUseCase

  constructor(authUserUseCase: AuthUserUseCase) {
    this.authUserUseCase = authUserUseCase
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.validCookies

      const result = await this.authUserUseCase.execute({ token })
      if (!result.IsSuccess()) return res.status(401)

      const user = result.GetValue()
      if (!user) return res.status(403)

      next()
    } catch (error) {
      return res.status(500)
    }
  }
}
