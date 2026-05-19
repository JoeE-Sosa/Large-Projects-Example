import { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import type { UserPersistence } from '../../domain/persistence/user.persistence.ts'
import type { DisableUserDTO } from './disable-user.dto.ts'

export class DisableUserUseCase {
  private readonly userPersistence: UserPersistence

  constructor(userPersistence: UserPersistence) {
    this.userPersistence = userPersistence
  }

  async execute(data: DisableUserDTO): Promise<Result<void>> {
    try {
      const { guid } = data

      const findResult = await this.userPersistence.findByGuid(guid)
      if (!findResult.IsSuccess()) return Result.Fail(findResult.GetError())

      const user = findResult.GetValue()
      const updateUser = user.disable()

      const updateResult = await this.userPersistence.save(updateUser)
      if (!updateResult.IsSuccess()) return Result.Fail(updateResult.GetError())

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail('An exception ocurred while trying to disable an user.')
    }
  }
}
