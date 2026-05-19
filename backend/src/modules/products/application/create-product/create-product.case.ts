import { Result } from "@/modules/shared/domain/patterns/result.pattern.ts";
import { Product } from "../../domain/entities/product.entity.ts";
import type { ProductPersistence } from "../../domain/persistence/product.persistence.ts";
import type { CreateProductDTO } from "./create-product.dto.ts";

export class CreateProductUseCase {
  private readonly productPersistence: ProductPersistence
  
  constructor(productPersistence: ProductPersistence) {
    this.productPersistence = productPersistence
  }

  async execute(data: CreateProductDTO): Promise<Result<void>> {
    try {
      const {sku, name, price, description } = data

      const product = Product.create({ sku, name, price, description })

      const createResult = await this.productPersistence.create(product)
      if(!createResult.IsSuccess()) return Result.Fail(createResult.GetError())
      
      return Result.Ok(null)
    } catch (error) {
      return Result.Fail("An exception ocurred while trying to create a product.")
    }
  }
}