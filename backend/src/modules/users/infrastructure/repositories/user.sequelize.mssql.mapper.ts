import { type Attributes } from 'sequelize'
import type { UserModel } from '@/services/database/sequelize/definitions/user.definition.ts'
import { User } from '../../domain/entities/user.entity.ts'

export class UserSequelizeMSSQLMapper {
  static toPersistence(user: User): Attributes<UserModel> {
    const { guid, name, password, role, department, disabled, createdAt, updatedAt } = user.toPrimitive()
    return { guid, name, password, role, department, disabled, createdAt, updatedAt }
  }

  static toDomain(user: UserModel): User {
    const { guid, name, role, department, disabled, createdAt, updatedAt } = user
    return User.build({ guid, name, role, department, disabled, createdAt, updatedAt })
  }
}
