import { Result } from "@/modules/shared/domain/patterns/result.pattern.ts";
import type { ProductPersistence } from "../../domain/persistence/product.persistence.ts";
import type { DisableProductDTO } from "./disable-product.dto.ts";

export class DisableProductUseCase {
  private readonly productPersistence: ProductPersistence

  constructor(productPersistence: ProductPersistence) {
    this.productPersistence = productPersistence
  }

  async execute(data: DisableProductDTO): Promise<Result<void>> {
    try {
      const { id } = data

      const findResult = await this.productPersistence.findById(id)
      if(!findResult.IsSuccess()) return Result.Fail(findResult.GetError())
      
      const productFound = findResult.GetValue()
      if(!productFound) return Result.Fail("Product not found.")

      const newProduct = productFound.disable()

      const saveResult = await this.productPersistence.save(newProduct)
      if(!saveResult.IsSuccess()) return Result.Fail(saveResult.GetError())

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail("An exception ocurred while trying to disable a product.")
    }
  }
}