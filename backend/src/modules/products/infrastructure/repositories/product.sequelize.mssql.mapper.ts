import type { ProductModel } from '@/interfaces/database/sequelize/models/sequelize.product.model.js'
import { Product } from '../../domain/entities/product.entity.ts'

export class ProductSequelizeMSSQLMapper {
  static toPersistence(product: Product): Attributes<ProductModel> {
    const { id, sku, name, price, description, disabled, createdAt, updatedAt } = product.toPrimitive()
    return { id, sku, name, price, description, disabled, createdAt, updatedAt }
  }
  static toDomain(product: ProductModel): Product {
    const { id, sku, name, price, description, disabled, createdAt, updatedAt } = product
    return Product.build({ id, sku, name, price, description, disabled, createdAt, updatedAt })
  }
}
