import { DataTypes, Model, Sequelize } from 'sequelize'

export class ProductModel extends Model {
  declare id: number
  declare sku: string
  declare name: string
  declare price: number
  declare description: string
  declare disabled: boolean
  declare createdAt: Date
  declare updatedAt: Date
}

export const InitProductDefinition = (database: Sequelize) => {
  const Product = ProductModel.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      sku: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.REAL, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      disabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize: database, modelName: 'Product', timestamps: true },
  )

  return Product
}
