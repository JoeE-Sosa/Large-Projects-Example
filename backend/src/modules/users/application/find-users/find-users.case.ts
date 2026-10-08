import { Result } from '@/lib/patterns/Result.js'
import type { User } from '../../domain/user.entity.js'
import type { UserPersistence } from '../../domain/user.persistence.js'

export class FindUsersUseCase {
  private readonly userPersistence: UserPersistence

  constructor(userPersistence: UserPersistence) {
    this.userPersistence = userPersistence
  }

  async execute(): Promise<Result<User[]>> {
    try {
      const users = await this.userPersistence.findAll()
      return Result.ok(users)
    } catch (error) {
      return Result.fail('An exception ocurred while trying to get all users.')
    }
  }
}
