import { Router } from 'express'
import type { ExpressModuleContract } from './domain/contracts/express.module.contract.ts'
import { AuthUserUseCase } from './application/auth-user/auth-user.case.ts'
import { AuthUserController } from './infrastructure/controllers/auth-user/auth-user.express.controller.ts'
import type { SessionServiceContract } from './domain/contracts/session.service.contract.ts'
import { JwTService } from './infrastructure/services/session.jwt.service.ts'
import { ValidateAuthUser } from './infrastructure/controllers/auth-user/auth-user.express.schema.ts'

export class AuthUserModule implements ExpressModuleContract {
  private readonly sessionService: SessionServiceContract
  private readonly authUserUseCase: AuthUserUseCase
  private readonly authUserController: AuthUserController

  constructor() {
    this.sessionService = new JwTService()
    this.authUserUseCase = new AuthUserUseCase(this.sessionService)
    this.authUserController = new AuthUserController(this.authUserUseCase)
  }

  execute(): Router {
    const router = Router()
    router.use(ValidateAuthUser)
    router.use(this.authUserController.execute)
    return router
  }
}
