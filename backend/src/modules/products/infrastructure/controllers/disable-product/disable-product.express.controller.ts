import type { DisableProductUseCase } from '@/modules/products/application/disable-product/disable-product.case.ts'
import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import {
  PositiveNoContentResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/services/server/express/express.responses.ts'
import type { Request, Response } from 'express'

export class DisableProductController implements ExpressControllerContract {
  private readonly disableProductUseCase: DisableProductUseCase

  constructor(disableProductUseCase: DisableProductUseCase) {
    this.disableProductUseCase = disableProductUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { id } = req.validData

      const result = await this.disableProductUseCase.execute({ id })
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      return PositiveNoContentResponse(res)
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
