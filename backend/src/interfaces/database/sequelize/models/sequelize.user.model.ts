import { type Sequelize, DataTypes } from 'sequelize'
import { BaseModel } from './sequelize.base.model'

export class UserModel extends BaseModel {
  declare email: string
  declare password: string
  declare name: string
  declare department: string

  static associate(models: any) {}
}

export function InitUserModel(sequelize: Sequelize) {
  const User = UserModel.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },

      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      department: { type: DataTypes.STRING, allowNull: false },

      disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
      removed: { type: DataTypes.BOOLEAN, defaultValue: false },
      creationDate: { type: DataTypes.DATE, allowNull: false },
      lastUpdate: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'Users', timestamps: true },
  )

  return User
}
