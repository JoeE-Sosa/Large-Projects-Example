import type { FindProductByIdUseCase } from '@/modules/products/application/find-product-by-id/find-product-by-id.case.ts'
import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import {
  PositiveResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/services/server/express/express.responses.ts'
import type { Request, Response } from 'express'

export class FindProductByIdController implements ExpressControllerContract {
  private readonly findProductByIdUseCase: FindProductByIdUseCase

  constructor(findProductByIdUseCase: FindProductByIdUseCase) {
    this.findProductByIdUseCase = findProductByIdUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { id } = req.validData

      const result = await this.findProductByIdUseCase.execute({ id })
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      const product = result.GetValue()

      return PositiveResponse(res, '', { product })
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
