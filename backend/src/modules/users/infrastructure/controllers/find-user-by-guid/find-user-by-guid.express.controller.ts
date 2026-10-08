import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import type { FindUserByGuidUseCase } from '@/modules/users/application/find-by-guid/find-user-by-guid.case.ts'
import {
  PositiveResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/interfaces/server/express/express.responses'
import type { Request, Response } from 'express'

export class FindUserByGuidController implements ExpressControllerContract {
  private readonly findUserByGuidUseCase: FindUserByGuidUseCase

  constructor(findUserByGuidUseCase: FindUserByGuidUseCase) {
    this.findUserByGuidUseCase = findUserByGuidUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { guid } = req.validData

      const result = await this.findUserByGuidUseCase.execute({ guid })
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      const user = result.GetValue()

      return PositiveResponse(res, '', { user })
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
