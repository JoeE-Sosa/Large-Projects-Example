import { InferAttributes } from 'sequelize'
import { User } from '../../domain/user.entity.js'
import type { UserModel } from '@/interfaces/database/sequelize/models/sequelize.user.model.js'

export class UserSequelizeMSSQLMapper {
  static toPersistence(user: User): InferAttributes<UserModel> {
    const { id, email, password, name, department, removed, disabled, creationDate, lastUpdate } = user.toPrimitive()
    return {
      id: id!,
      email,
      password,
      name,
      department,
      removed: removed!,
      disabled: disabled!,
      creationDate: creationDate!,
      lastUpdate: lastUpdate!,
    }
  }

  static toDomain(user: UserModel): User {
    return User.build(user)
  }
}
