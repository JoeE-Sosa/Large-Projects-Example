import { BaseEntity, BasePrimitive } from '@/lib/bases/base.entity'

export type PrimitiveUser = BasePrimitive & {
  email: string
  password: string
  name: string
  department: string
}

export class User extends BaseEntity<PrimitiveUser> {
  static create(createUser: { email: string; password: string; name: string; department: string }) {
    const { email, password, name, department } = createUser
    return new User({
      email,
      password,
      name,
      department,
    })
  }

  static build(buildUser: PrimitiveUser) {
    return new User(buildUser)
  }

  update(updateUser: { email?: string; name?: string; role?: string }) {
    const { email, name, role } = updateUser
    return User.build({
      ...this.attributes,
      email: email !== undefined ? email : this.attributes.email,
      name: name !== undefined ? name : this.attributes.name,
      lastUpdate: new Date(),
    })
  }
}
