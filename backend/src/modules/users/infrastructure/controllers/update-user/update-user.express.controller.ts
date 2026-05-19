import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import type { UpdateUserUseCase } from '@/modules/users/application/update-user/update-user.case.ts'
import {
  PositiveNoContentResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/services/server/express/express.responses.ts'
import type { Request, Response } from 'express'

export class UpdateUserController implements ExpressControllerContract {
  private readonly updateUserUseCase: UpdateUserUseCase

  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { guid, name, role, department } = req.validData

      const result = await this.updateUserUseCase.execute({ guid, name, role, department })
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      return PositiveNoContentResponse(res)
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
