import { Result } from "@/modules/shared/domain/patterns/result.pattern.ts";
import type { ProductPersistence } from "../../domain/persistence/product.persistence.ts";
import type { Product } from "../../domain/entities/product.entity.ts";

export class FindProductsUseCase {
  private readonly productPersistence: ProductPersistence

  constructor(productPersistence: ProductPersistence) {
    this.productPersistence = productPersistence
  }

  async execute(): Promise<Result<Product[]>> {
    try {

      const findResult = await this.productPersistence.findAll()
      if(!findResult.IsSuccess()) return Result.Fail(findResult.GetError())

      const products = findResult.GetValue()

      return Result.Ok(products)
    } catch (error) {
      return Result.Fail("An exception ocurred while trying to find products.")
    }
  }
}