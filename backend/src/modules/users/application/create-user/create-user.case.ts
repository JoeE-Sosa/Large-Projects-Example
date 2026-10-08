import { EncryptService } from '@/modules/shared/domain/contracts/encrypt.service.contract'
import { UserPersistence } from '../../domain/user.persistence'
import { CreateUserDTO } from './create-user.dto'
import { Result } from '@/lib/patterns/Result'
import { User } from '../../domain/user.entity'

export class CreateUserUseCase {
  private readonly userPersistence: UserPersistence
  private readonly encryptService: EncryptService

  constructor(userPersistence: UserPersistence, encryptService: EncryptService) {
    this.userPersistence = userPersistence
    this.encryptService = encryptService
  }

  async execute(data: CreateUserDTO): Promise<Result<void>> {
    try {
      const { email, password, name, department } = data

      const hashedPassword = await this.encryptService.hash(password)
      const user = User.create({ email, password: hashedPassword, name, department })
      await this.userPersistence.create(user)

      return Result.ok(null)
    } catch (error) {
      return Result.fail('An exception ocurred while trying to create an user.')
    }
  }
}
