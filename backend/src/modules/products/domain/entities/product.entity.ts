import { EntityContract } from "@/modules/shared/domain/entities/entity.contract.ts"

export interface PrimitiveProduct {
  id?: number
  sku: string
  name: string
  price: number
  description: string
  disabled: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class Product extends EntityContract<PrimitiveProduct> {
  static create(createProduct: { sku: string, name: string, price: number, description: string}){
    const {sku, name, price, description} = createProduct
    return new Product({sku, name, price, description, disabled: false})
  }

  static build(buildProduct: PrimitiveProduct){
    return new Product(buildProduct)
  }

  update(updateProduct: {sku: string, name: string, price: number, description: string}){
    const {sku, name, price, description} = updateProduct
    return Product.build({ ...this.attributes, sku, name, price, description, updatedAt: new Date()})
  }

  restore(){
    return Product.build({...this.attributes, disabled: false, updatedAt: new Date()})
  }

  disable(){
    return Product.build({...this.attributes, disabled: true, updatedAt: new Date()})
  }
}