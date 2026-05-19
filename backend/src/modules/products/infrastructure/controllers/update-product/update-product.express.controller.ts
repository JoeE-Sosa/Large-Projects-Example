import type { UpdateProductUseCase } from '@/modules/products/application/update-product/update-product.case.ts'
import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import {
  PositiveNoContentResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/services/server/express/express.responses.ts'
import type { Request, Response } from 'express'

export class UpdateProductController implements ExpressControllerContract {
  private readonly updateProductUseCase: UpdateProductUseCase

  constructor(updateProductUseCase: UpdateProductUseCase) {
    this.updateProductUseCase = updateProductUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { query, body } = req.validData
      const { id } = query
      const { sku, name, price, description } = body

      const result = await this.updateProductUseCase.execute({ id, sku, name, price, description })
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      return PositiveNoContentResponse(res)
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
