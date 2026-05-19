import { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import type { UserPersistence } from '../../domain/persistence/user.persistence.ts'
import type { UpdateUserDTO } from './update-user.dto.ts'

export class UpdateUserUseCase {
  private readonly userPersistence: UserPersistence

  constructor(userPersistence: UserPersistence) {
    this.userPersistence = userPersistence
  }

  async execute(data: UpdateUserDTO): Promise<Result<void>> {
    try {
      const { guid, name, role, department } = data

      const findResult = await this.userPersistence.findByGuid(guid)
      if (!findResult.IsSuccess()) return Result.Fail(findResult.GetError())

      const user = findResult.GetValue()
      const updatedUser = user.update({ name, role, department })

      const updateResult = await this.userPersistence.save(updatedUser)
      if (!updateResult.IsSuccess()) return Result.Fail(updateResult.GetError())

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail('An exception ocurred while trying to update an user.')
    }
  }
}
