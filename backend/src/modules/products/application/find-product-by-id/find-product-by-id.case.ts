import { Result } from "@/modules/shared/domain/patterns/result.pattern.ts"
import type { ProductPersistence } from "../../domain/persistence/product.persistence.ts"
import type { FindProductByIdDTO } from "./find-product-by-id.dto.ts"
import type { Product } from "../../domain/entities/product.entity.ts"

export class FindProductByIdUseCase {
  private readonly productPersistence: ProductPersistence

  constructor(productPersistence: ProductPersistence) {
    this.productPersistence = productPersistence
  }

  async execute(data: FindProductByIdDTO): Promise<Result<Product>> {
    try {
      const {id} = data

      const findResult = await this.productPersistence.findById(id)
      if(!findResult.IsSuccess()) return Result.Fail(findResult.GetError())
      
      const product = findResult.GetValue()
      
      return Result.Ok(product)
    } catch (error) {
      return Result.Fail("An exception ocurred while trying to find a product.")
    }
  }
}