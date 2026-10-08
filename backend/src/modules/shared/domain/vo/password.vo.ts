import { Result } from '@/lib/patterns/Result'
import type { EncryptServiceContract } from '@/modules/shared/domain/contracts/encrypt.service.contract.ts'
import { VOContact } from '@/modules/shared/domain/value-objects/value-objects.contract'

export class PasswordVO extends VOContact<string> {
  static async create(value: string, encryptService: EncryptServiceContract): Promise<Result<PasswordVO>> {
    try {
      if (!value) return Result.fail('The password is undefined.')
      if (value.length < 8) return Result.fail('The password must be at least 8 characters long.')
      if (!/[A-Z]/.test(value)) return Result.fail('The password must contain at least one uppercase letter.')
      if (!/[0-9]/.test(value)) return Result.fail('The password must contain at least one number.')
      if (!/[^A-Za-z0-9]/.test(value)) return Result.fail('The password must contain at least one special character.')

      const hashedPassword = await encryptService.hash(value)

      return Result.ok(new PasswordVO(hashedPassword))
    } catch (error) {
      return Result.fail('The password is not valid.')
    }
  }
}
