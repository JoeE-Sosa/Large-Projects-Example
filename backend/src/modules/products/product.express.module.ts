import { Router } from 'express'

import { USER_ROLES } from '@/lib/constants/user-roles.ts'

import type { ExpressModuleContract } from '../shared/domain/contracts/express.module.contract.ts'
import type { ProductPersistence } from './domain/persistence/product.persistence.ts'

import { CreateProductUseCase } from './application/create-product/create-product.case.ts'
import { FindProductsUseCase } from './application/find-products/find-products.case.ts'
import { FindProductByIdUseCase } from './application/find-product-by-id/find-product-by-id.case.ts'
import { UpdateProductUseCase } from './application/update-product/update-product.case.ts'
import { DisableProductUseCase } from './application/disable-product/disable-product.case.ts'

import { authEndpoint } from '../shared/auth-endpoint.express.module.ts'
import { ProductSequelizeMSSQLRespository } from './infrastructure/repositories/product.sequelize.mssql.repository.ts'

import { ValidateCreateProduct } from './infrastructure/controllers/create-product/create-product.express.schema.ts'
import { ValidateUpdateProduct } from './infrastructure/controllers/update-product/update-product.express.schema.ts'
import { ValidateFindProductById } from './infrastructure/controllers/find-product-by-id/find-product-by-id.express.schema.ts'
import { ValidateDisableProduct } from './infrastructure/controllers/disable-product/disable-product.express.schema.ts'

import { CreateProductController } from './infrastructure/controllers/create-product/create-product.express.controller.ts'
import { FindProductsController } from './infrastructure/controllers/find-products/find-products.express.controller.ts'
import { FindProductByIdController } from './infrastructure/controllers/find-product-by-id/find-product-by-id.express.controller.ts'
import { UpdateProductController } from './infrastructure/controllers/update-product/update-product.express.controller.ts'
import { DisableProductController } from './infrastructure/controllers/disable-product/disable-product.express.controller.ts'

export class ProductModule implements ExpressModuleContract {
  private readonly productPersistence: ProductPersistence

  private readonly createProductUseCase: CreateProductUseCase
  private readonly findProductsUseCase: FindProductsUseCase
  private readonly findProductByIdUseCase: FindProductByIdUseCase
  private readonly updateProductUseCase: UpdateProductUseCase
  private readonly disableProductUseCase: DisableProductUseCase

  private readonly createProductController: CreateProductController
  private readonly findProductsController: FindProductsController
  private readonly findProductByIdController: FindProductByIdController
  private readonly updateProductController: UpdateProductController
  private readonly disableProductController: DisableProductController

  constructor() {
    this.productPersistence = new ProductSequelizeMSSQLRespository()

    this.createProductUseCase = new CreateProductUseCase(this.productPersistence)
    this.findProductsUseCase = new FindProductsUseCase(this.productPersistence)
    this.findProductByIdUseCase = new FindProductByIdUseCase(this.productPersistence)
    this.updateProductUseCase = new UpdateProductUseCase(this.productPersistence)
    this.disableProductUseCase = new DisableProductUseCase(this.productPersistence)

    this.createProductController = new CreateProductController(this.createProductUseCase)
    this.findProductsController = new FindProductsController(this.findProductsUseCase)
    this.findProductByIdController = new FindProductByIdController(this.findProductByIdUseCase)
    this.updateProductController = new UpdateProductController(this.updateProductUseCase)
    this.disableProductController = new DisableProductController(this.disableProductUseCase)
  }

  execute(): Router {
    const { ADMIN, MODERATOR, MEMBER } = USER_ROLES
    const router = Router()

    router.post('/', authEndpoint(MODERATOR), ValidateCreateProduct, this.createProductController.execute)
    router.get('/', authEndpoint(MEMBER), this.findProductsController.execute)
    router.get('/:id', authEndpoint(MEMBER), ValidateFindProductById, this.findProductByIdController.execute)
    router.put('/:id', authEndpoint(MODERATOR), ValidateUpdateProduct, this.updateProductController.execute)
    router.delete('/:id', authEndpoint(ADMIN), ValidateDisableProduct, this.disableProductController.execute)

    return router
  }
}
