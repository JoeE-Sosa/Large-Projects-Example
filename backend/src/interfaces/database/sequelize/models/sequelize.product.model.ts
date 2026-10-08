import { DataTypes, Model, Sequelize } from 'sequelize'
import { BaseModel } from './sequelize.base.model'

export class ProductModel extends BaseModel {
  declare code: string
  declare name: string
  declare description: string
  declare price: number

  static associate(models: any) {}
}

export const InitProductModel = (sequelize: Sequelize) => {
  const Product = ProductModel.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },

      code: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.REAL, allowNull: false },

      disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
      removed: { type: DataTypes.BOOLEAN, defaultValue: false },
      creationDate: { type: DataTypes.DATE, allowNull: false },
      lastUpdate: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'Products', timestamps: true },
  )

  return Product
}
