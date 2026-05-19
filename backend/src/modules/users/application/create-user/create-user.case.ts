import type { EncryptServiceContract } from '@/modules/shared/domain/contracts/encrypt.service.contract.ts'
import { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import { User } from '../../domain/entities/user.entity.ts'
import type { UserPersistence } from '../../domain/persistence/user.persistence.ts'
import { PasswordVO } from '../../domain/value-objects/password.vo.ts'
import type { CreateUserDTO } from './create-user.dto.ts'

export class CreateUserUseCase {
  private readonly userPersistence: UserPersistence
  private readonly encryptService: EncryptServiceContract

  constructor(userPersistence: UserPersistence, encryptService: EncryptServiceContract) {
    this.userPersistence = userPersistence
    this.encryptService = encryptService
  }

  async execute(data: CreateUserDTO): Promise<Result<void>> {
    try {
      const { name, password, role, department } = data

      const passwordResult = await PasswordVO.create(password, this.encryptService)
      if (!passwordResult.IsSuccess()) return Result.Fail(passwordResult.GetError())

      const passwordVO = passwordResult.GetValue()

      const user = User.create({ name, password: passwordVO, role, department })

      const createdResult = await this.userPersistence.create(user)
      if (!createdResult.IsSuccess()) return Result.Fail(createdResult.GetError())

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail('An exception ocurred while trying to create an user.')
    }
  }
}
