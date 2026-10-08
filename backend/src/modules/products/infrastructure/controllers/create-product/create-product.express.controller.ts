import type { Request, Response } from 'express'
import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import type { CreateProductUseCase } from '@/modules/products/application/create-product/create-product.case.ts'
import {
  PositiveCreatedResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/interfaces/server/express/express.responses'

export class CreateProductController implements ExpressControllerContract {
  private readonly createProductUseCase: CreateProductUseCase

  constructor(createProductUseCase: CreateProductUseCase) {
    this.createProductUseCase = createProductUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { sku, name, price, description } = req.validData

      const result = await this.createProductUseCase.execute({ sku, name, price, description })
      if (!result.IsSuccess()) return ResultErrorResponse(res, result.GetError())

      return PositiveCreatedResponse(res)
    } catch (error) {
      return ServerErrorResponse(res)
    }
  }
}
