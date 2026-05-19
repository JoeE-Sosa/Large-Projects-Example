import { Result } from "@/modules/shared/domain/patterns/result.pattern.ts";
import type { ProductPersistence } from "../../domain/persistence/product.persistence.ts";
import type { UpdateProductDTO } from "./update-product.dto.ts";

export class UpdateProductUseCase {
  private readonly productPersistence: ProductPersistence

  constructor(productPersistence: ProductPersistence){
    this.productPersistence = productPersistence
  }

  async execute(data: UpdateProductDTO): Promise<Result<void>> {
    try {
      const {id, sku, name, price,description} = data

      const findResult = await this.productPersistence.findById(id)
      if(!findResult.IsSuccess()) return Result.Fail(findResult.GetError())
    
      const product = findResult.GetValue()
      const newProduct = product.update({sku, name, price, description})

      const saveResult = await this.productPersistence.save(newProduct)
      if(!saveResult.IsSuccess()) return Result.Fail(saveResult.GetError())
      
      return Result.Ok(null)
    } catch (error) {
      return Result.Fail("An exception ocurred while trying to update a product.")
    }
  }
}