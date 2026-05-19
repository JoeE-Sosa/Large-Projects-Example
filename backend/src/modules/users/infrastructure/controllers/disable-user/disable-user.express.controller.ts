import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import type { DisableUserUseCase } from '@/modules/users/application/disable-user/disable-user.case.ts'
import { PositiveNoContentResponse, ServerErrorResponse } from '@/services/server/express/express.responses.ts'
import type { Request, Response } from 'express'

export class DisableUserController implements ExpressControllerContract {
  private readonly disableUserUseCase: DisableUserUseCase

  constructor(disableUserUseCase: DisableUserUseCase) {
    this.disableUserUseCase = disableUserUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { guid } = req.validData

      const result = await this.disableUserUseCase.execute({ guid })
      if (!result.IsSuccess()) return res.status(400).send({ message: result.GetError() })

      return PositiveNoContentResponse(res)
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
