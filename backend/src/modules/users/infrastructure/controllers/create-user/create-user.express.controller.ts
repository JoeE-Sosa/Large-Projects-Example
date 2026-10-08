import type { Request, Response } from 'express'
import type { CreateUserUseCase } from '@/modules/users/application/create-user/create-user.case.ts'
import { CreateUserSchemaType } from './create-user.express.schema'
import {
  PositiveCreatedResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/interfaces/server/express/express.responses'
import { ExpressController } from '@/modules/shared/domain/contracts/express.controller.contract'

export class CreateUserController implements ExpressController {
  private readonly createUserUseCase: CreateUserUseCase

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  execute = async (req: Request, res: Response) => {
    try {
      const { body } = req.validData as CreateUserSchemaType
      const { email, password, name, department } = body

      const result = await this.createUserUseCase.execute({ email, password, name, department })
      if (!result.IsSuccess()) return ResultErrorResponse(res, { message: result.GetError() })

      return PositiveCreatedResponse(res, { message: 'User created succesfully.' })
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
