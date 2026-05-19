import type { FindProductsUseCase } from '@/modules/products/application/find-products/find-products.case.ts'
import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import {
  PositiveResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/services/server/express/express.responses.ts'
import type { Request, Response } from 'express'

export class FindProductsController implements ExpressControllerContract {
  private readonly findProductsUseCase: FindProductsUseCase

  constructor(findProductsUseCase: FindProductsUseCase) {
    this.findProductsUseCase = findProductsUseCase
  }

  execute = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const result = await this.findProductsUseCase.execute()
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      const products = result.GetValue()

      return PositiveResponse(res, '', { products })
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
