import { Result } from '@/modules/shared/domain/patterns/result.pattern.ts'
import type { Product } from '../../domain/entities/product.entity.ts'
import type { ProductPersistence } from '../../domain/persistence/product.persistence.ts'
import { sequelizeDatabase } from '@/interfaces/database/sequelize/sequelize.database.js'
import { ProductSequelizeMSSQLMapper } from './product.sequelize.mssql.mapper.ts'

export class ProductSequelizeMSSQLRespository implements ProductPersistence {
  private readonly model: ModelCtor<Model>

  constructor() {
    this.model = sequelizeDatabase.instance.model('Product')
  }

  async create(product: Product): Promise<Result<Product>> {
    try {
      const productPersistence = ProductSequelizeMSSQLMapper.toPersistence(product)
      const productCreated = await this.model.create(productPersistence)
      const productDomain = ProductSequelizeMSSQLMapper.toDomain(productCreated.dataValues)

      return Result.Ok(productDomain)
    } catch (error) {
      return Result.Fail('Database failed to create a product.')
    }
  }

  async findAll(): Promise<Result<Product[]>> {
    try {
      const productsFound = await this.model.findAll({ where: { disabled: false } })
      const productsDomain = productsFound.map((product) => ProductSequelizeMSSQLMapper.toDomain(product.dataValues))

      return Result.Ok(productsDomain)
    } catch (error) {
      return Result.Fail('Database failed to find all products.')
    }
  }

  async findById(id: number): Promise<Result<Product>> {
    try {
      const productFound = await this.model.findOne({ where: { id, disabled: false } })
      const productDomain = ProductSequelizeMSSQLMapper.toDomain(productFound.dataValues)

      return Result.Ok(productDomain)
    } catch (error) {
      return Result.Fail('Database failed to find the product by Id.')
    }
  }

  async save(product: Product): Promise<Result<void>> {
    try {
      const productPersistence = ProductSequelizeMSSQLMapper.toPersistence(product)

      await this.model.update(productPersistence, { where: { id: productPersistence.id } })

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail('Database failed to save a product.')
    }
  }
}
