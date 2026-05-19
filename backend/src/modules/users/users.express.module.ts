import { USER_ROLES } from '@/constants/user-roles.ts'
import { authEndpoint } from '../shared/auth-endpoint.express.module.ts'

import type { EncryptServiceContract } from '../shared/domain/contracts/encrypt.service.contract.ts'
import type { ExpressModuleContract } from '../shared/domain/contracts/express.module.contract.ts'
import type { UserPersistence } from './domain/persistence/user.persistence.ts'

import { CreateUserUseCase } from './application/create-user/create-user.case.ts'
import { FindUsersUseCase } from './application/find-users/find-users.case.ts'
import { FindUserByGuidUseCase } from './application/find-by-guid/find-user-by-guid.case.ts'
import { UpdateUserUseCase } from './application/update-user/update-user.case.ts'
import { DisableUserUseCase } from './application/disable-user/disable-user.case.ts'

import { BycriptService } from '../shared/infrastructure/services/encrypt.bycript.service.ts'
import { UserSequelizeMSSQLRepository } from './infrastructure/repositories/user.sequelize.mssql.repository.ts'

import { ValidateCreateUser } from './infrastructure/controllers/create-user/create-user.express.schema.ts'
import { ValidateFindUserByGuid } from './infrastructure/controllers/find-user-by-guid/find-user-by-guid.express.schema.ts'
import { ValidateUpdateUser } from './infrastructure/controllers/update-user/update-user.express.schema.ts'
import { ValidateDisableUser } from './infrastructure/controllers/disable-user/disable-user.express.schema.ts'

import { CreateUserController } from './infrastructure/controllers/create-user/create-user.express.controller.ts'
import { FindUsersController } from './infrastructure/controllers/find-users/find-users.express.controller.ts'
import { FindUserByGuidController } from './infrastructure/controllers/find-user-by-guid/find-user-by-guid.express.controller.ts'
import { UpdateUserController } from './infrastructure/controllers/update-user/update-user.express.controller.ts'
import { DisableUserController } from './infrastructure/controllers/disable-user/disable-user.express.controller.ts'
import { Router } from 'express'

export class UserModule implements ExpressModuleContract {
  private readonly encryptService: EncryptServiceContract
  private readonly userPersistence: UserPersistence

  private readonly createUserUseCase: CreateUserUseCase
  private readonly findUsersUseCase: FindUsersUseCase
  private readonly findUserByGuidUseCase: FindUserByGuidUseCase
  private readonly updateUserUseCase: UpdateUserUseCase
  private readonly disableUserUseCase: DisableUserUseCase

  private readonly createUserController: CreateUserController
  private readonly findUsersController: FindUsersController
  private readonly findUserByGuidController: FindUserByGuidController
  private readonly updateUserController: UpdateUserController
  private readonly disableUserController: DisableUserController

  constructor() {
    this.encryptService = new BycriptService()

    this.userPersistence = new UserSequelizeMSSQLRepository()

    this.createUserUseCase = new CreateUserUseCase(this.userPersistence, this.encryptService)
    this.findUsersUseCase = new FindUsersUseCase(this.userPersistence)
    this.findUserByGuidUseCase = new FindUserByGuidUseCase(this.userPersistence)
    this.updateUserUseCase = new UpdateUserUseCase(this.userPersistence)
    this.disableUserUseCase = new DisableUserUseCase(this.userPersistence)

    this.createUserController = new CreateUserController(this.createUserUseCase)
    this.findUsersController = new FindUsersController(this.findUsersUseCase)
    this.findUserByGuidController = new FindUserByGuidController(this.findUserByGuidUseCase)
    this.updateUserController = new UpdateUserController(this.updateUserUseCase)
    this.disableUserController = new DisableUserController(this.disableUserUseCase)
  }

  execute(): Router {
    const { ADMIN, MEMBER } = USER_ROLES
    const router = Router()

    router.post('/', authEndpoint(ADMIN), ValidateCreateUser, this.createUserController.execute)
    router.get('/', authEndpoint(ADMIN), this.findUsersController.execute)
    router.get('/:guid', authEndpoint(MEMBER), ValidateFindUserByGuid, this.findUserByGuidController.execute)
    router.put('/:guid', authEndpoint(ADMIN), ValidateUpdateUser, this.updateUserController.execute)
    router.patch('/:guid', authEndpoint(ADMIN), ValidateDisableUser, this.disableUserController.execute)

    return router
  }
}
