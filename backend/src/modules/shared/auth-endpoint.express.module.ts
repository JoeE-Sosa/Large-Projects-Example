import type { USER_ROLES } from '@/constants/user-roles.ts'
import { AuthEndpointUseCase } from './application/auth-endpoint/auth-endpoint.case.ts'
import { AuthEndpointController } from './infrastructure/controllers/auth-endpoint/auth-endpoint.express.controller.ts'

class AuthEndpointModule {
  private readonly authEndpointUseCase: AuthEndpointUseCase
  private readonly authEndpointController: AuthEndpointController

  constructor() {
    this.authEndpointUseCase = new AuthEndpointUseCase()
    this.authEndpointController = new AuthEndpointController(this.authEndpointUseCase)
  }

  execute = (minRole: keyof typeof USER_ROLES) => {
    return this.authEndpointController.execute(minRole)
  }
}

export const authEndpoint = new AuthEndpointModule().execute
