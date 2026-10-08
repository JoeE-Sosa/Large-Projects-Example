import { Router } from 'express'
import { EncryptService } from '../shared/domain/contracts/encrypt.service.contract'
import { ExpressModuleContract } from '../shared/domain/contracts/express.module.contract'
import { BycriptService } from '../shared/infrastructure/services/encrypt.bycript.service'
import { UserPersistence } from './domain/user.persistence'
import { UserSequelizeMSSQLRepository } from './infrastructure/repositories/user.sequelize.mssql.repository'
import { CreateUserUseCase } from './application/create-user/create-user.case'
import { CreateUserController } from './infrastructure/controllers/create-user/create-user.express.controller'
import { DataValidator } from '@/interfaces/server/express/middlewares/zod'
import { CreateUserSchema } from './infrastructure/controllers/create-user/create-user.express.schema'
import { FindUsersUseCase } from './application/find-users/find-users.case'
import { FindUsersController } from './infrastructure/controllers/find-users/find-users.express.controller'

export class UserModule implements ExpressModuleContract {
  private readonly encryptService: EncryptService
  private readonly userPersistence: UserPersistence

  private readonly createUserUseCase: CreateUserUseCase
  private readonly findUsersUseCase: FindUsersUseCase
  // private readonly findUserByGuidUseCase: FindUserByGuidUseCase
  // private readonly updateUserUseCase: UpdateUserUseCase
  // private readonly disableUserUseCase: DisableUserUseCase

  private readonly createUserController: CreateUserController
  private readonly findUsersController: FindUsersController
  // private readonly findUserByGuidController: FindUserByGuidController
  // private readonly updateUserController: UpdateUserController
  // private readonly disableUserController: DisableUserController

  constructor() {
    this.encryptService = new BycriptService()
    this.userPersistence = new UserSequelizeMSSQLRepository()

    this.createUserUseCase = new CreateUserUseCase(this.userPersistence, this.encryptService)
    this.findUsersUseCase = new FindUsersUseCase(this.userPersistence)
    // this.findUserByGuidUseCase = new FindUserByGuidUseCase(this.userPersistence)
    // this.updateUserUseCase = new UpdateUserUseCase(this.userPersistence)
    // this.disableUserUseCase = new DisableUserUseCase(this.userPersistence)

    this.createUserController = new CreateUserController(this.createUserUseCase)
    this.findUsersController = new FindUsersController(this.findUsersUseCase)
    // this.findUserByGuidController = new FindUserByGuidController(this.findUserByGuidUseCase)
    // this.updateUserController = new UpdateUserController(this.updateUserUseCase)
    // this.disableUserController = new DisableUserController(this.disableUserUseCase)
  }

  execute(): Router {
    const router = Router()

    router.post('/', DataValidator(CreateUserSchema), this.createUserController.execute)
    router.get('/', this.findUsersController.execute)
    // router.get('/:guid', authEndpoint(MEMBER), ValidateFindUserByGuid, this.findUserByGuidController.execute)
    // router.put('/:guid', authEndpoint(ADMIN), ValidateUpdateUser, this.updateUserController.execute)
    // router.patch('/:guid', authEndpoint(ADMIN), ValidateDisableUser, this.disableUserController.execute)

    return router
  }
}
