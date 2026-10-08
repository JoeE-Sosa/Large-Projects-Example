import { User } from './user.entity'

export interface UserPersistence {
  create(user: User): Promise<User>
  findAll(): Promise<User[]>
  save(user: User): Promise<void>
}
