import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import type { FindUsersUseCase } from '@/modules/users/application/find-users/find-users.case.ts'
import {
  PositiveResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/services/server/express/express.responses.ts'
import type { Request, Response } from 'express'

export class FindUsersController implements ExpressControllerContract {
  private readonly findUsersUseCase: FindUsersUseCase

  constructor(findUsersUseCase: FindUsersUseCase) {
    this.findUsersUseCase = findUsersUseCase
  }

  execute = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const result = await this.findUsersUseCase.execute()
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      const users = result.GetValue()

      return PositiveResponse(res, '', { users })
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
