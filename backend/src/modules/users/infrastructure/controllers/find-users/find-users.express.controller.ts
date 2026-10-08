import {
  PositiveResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/interfaces/server/express/express.responses'
import { ExpressController } from '@/modules/shared/domain/contracts/express.controller.contract'
import { FindUsersUseCase } from '@/modules/users/application/find-users/find-users.case'
import type { Request, Response } from 'express'

export class FindUsersController implements ExpressController {
  private readonly findUsersUseCase: FindUsersUseCase

  constructor(findUsersUseCase: FindUsersUseCase) {
    this.findUsersUseCase = findUsersUseCase
  }

  execute = async (_: Request, res: Response) => {
    try {
      const result = await this.findUsersUseCase.execute()
      if (!result.IsSuccess()) return ResultErrorResponse(res, { message: result.GetError() })

      const users = result.GetValue()

      return PositiveResponse(res, { message: '', content: users })
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
