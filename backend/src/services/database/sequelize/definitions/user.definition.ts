import { USER_ROLES } from '@/constants/user-roles.ts'
import { DataTypes, Model, Sequelize } from 'sequelize'

export class UserModel extends Model {
  declare guid: string
  declare name: string
  declare password: string
  declare role: USER_ROLES
  declare department: string
  declare disabled: boolean
  declare createdAt: Date
  declare updatedAt: Date
}

export const InitUserDefinition = (database: Sequelize) => {
  const User = UserModel.init(
    {
      guid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM(...Object.values(USER_ROLES)), allowNull: false, defaultValue: USER_ROLES.MEMBER },
      department: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: database, modelName: 'User', timestamps: true },
  )
  return User
}
