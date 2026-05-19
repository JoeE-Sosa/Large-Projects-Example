import type { Result } from "@/modules/shared/domain/patterns/result.pattern.ts";
import type { Product } from "../entities/product.entity.ts";

export abstract class ProductPersistence {
  abstract create(product: Product): Promise<Result<Product>>
  abstract findAll(): Promise<Result<Product[]>>
  abstract findById(id: number): Promise<Result<Product>>
  abstract save(product: Product): Promise<Result<void>>
}