import { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import type { User } from '../../domain/entities/user.entity.ts'
import type { UserPersistence } from '../../domain/persistence/user.persistence.ts'

export class FindUsersUseCase {
  private readonly userPersistence: UserPersistence

  constructor(userPersistence: UserPersistence) {
    this.userPersistence = userPersistence
  }

  async execute(): Promise<Result<User[]>> {
    try {
      const getAllResult = await this.userPersistence.findAll()
      if (!getAllResult.IsSuccess()) return Result.Fail(getAllResult.GetError())

      const users = getAllResult.GetValue()

      return Result.Ok(users)
    } catch (error) {
      return Result.Fail('An exception ocurred while trying to get all users.')
    }
  }
}
