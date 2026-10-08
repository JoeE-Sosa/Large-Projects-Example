import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import type { FastifyModuleContract } from '../shared/domain/contracts/fastify.module.contract.ts'
import type { UserPersistence } from './domain/user.persistence.js'
import { DisableUserUseCase } from './application/disable-user/disable-user.case.ts'
import { DisableUserController } from './infrastructure/controllers/disable-user/disable-user.fastify.controller.ts'
import { UserSequelizeMSSQLRepository } from './infrastructure/repositories/user.sequelize.mssql.repository.ts'
import { ValidateDisableUser } from './infrastructure/controllers/disable-user/disable-user.fastify.schema.ts'

export class FastifyModule implements FastifyModuleContract {
  private readonly userPersistence: UserPersistence
  private readonly disableUserUseCase: DisableUserUseCase
  private readonly disableUserController: DisableUserController

  constructor() {
    this.userPersistence = new UserSequelizeMSSQLRepository()
    this.disableUserUseCase = new DisableUserUseCase(this.userPersistence)
    this.disableUserController = new DisableUserController(this.disableUserUseCase)
  }

  execute = (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.delete('/', { preHandler: [ValidateDisableUser] }, this.disableUserController.execute)
  }
}
