import { EntityContract } from '../../../shared/domain/entities/entity.contract.ts'
import type { PasswordVO } from '../value-objects/password.vo.ts'

export interface PrimitiveUser {
  guid?: string
  name: string
  password?: PasswordVO
  role: string
  department: string
  disabled: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class User extends EntityContract<PrimitiveUser> {
  static create(createUser: { name: string; password: PasswordVO; role: string; department: string }) {
    const { name, password, role, department } = createUser
    return new User({ name, password, role, department, disabled: true })
  }

  static build(buildUser: PrimitiveUser) {
    return new User(buildUser)
  }

  update(updateUser: { name?: string; role?: string; department?: string }): User {
    return User.build({
      ...this.attributes,
      ...updateUser,
      updatedAt: new Date(),
    })
  }

  changePassword(password: PasswordVO): User {
    return User.build({ ...this.attributes, password, updatedAt: new Date() })
  }

  restore(): User {
    return User.build({
      ...this.attributes,
      disabled: false,
      updatedAt: new Date(),
    })
  }

  disable(): User {
    return User.build({
      ...this.attributes,
      disabled: true,
      updatedAt: new Date(),
    })
  }
}
