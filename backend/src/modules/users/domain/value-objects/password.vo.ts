import type { EncryptServiceContract } from '@/modules/shared/domain/contracts/encrypt.service.contract.ts'
import { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import { ValueObjectContract } from '../../../shared/domain/value-objects/value-objects.contract.ts'

export class PasswordVO extends ValueObjectContract<string> {
  static async create(value: string, encryptService: EncryptServiceContract): Promise<Result<PasswordVO>> {
    try {
      if (!value) return Result.Fail('The password is undefined.')
      if (value.length < 8) return Result.Fail('The password must be at least 8 characters long.')
      if (!/[A-Z]/.test(value)) return Result.Fail('The password must contain at least one uppercase letter.')
      if (!/[0-9]/.test(value)) return Result.Fail('The password must contain at least one number.')
      if (!/[^A-Za-z0-9]/.test(value)) return Result.Fail('The password must contain at least one special character.')

      const result = await encryptService.hash(value)
      if (!result.IsSuccess()) return Result.Fail(result.GetError())
      const hashedPassword = result.GetValue()

      return Result.Ok(new PasswordVO(hashedPassword))
    } catch (error) {
      return Result.Fail('The password is not valid.')
    }
  }
}
