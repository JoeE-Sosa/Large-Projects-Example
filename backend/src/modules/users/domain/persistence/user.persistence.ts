import type { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import type { User } from '../entities/user.entity.ts'

export abstract class UserPersistence {
  abstract create(user: User): Promise<Result<User>>
  abstract findAll(): Promise<Result<User[]>>
  abstract findByGuid(guid: string): Promise<Result<User>>
  abstract save(user: User): Promise<Result<void>>
}
