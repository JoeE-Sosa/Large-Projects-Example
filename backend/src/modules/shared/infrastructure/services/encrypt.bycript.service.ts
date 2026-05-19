import type { EncryptServiceContract } from '../../domain/contracts/encrypt.service.contract.ts'
import { Result } from '../../domain/patterns/result.pattern.ts'

export class BycriptService implements EncryptServiceContract {
  async hash(value: string): Promise<Result<string>> {
    try {
      return Result.Ok('')
    } catch (error) {
      return Result.Fail('')
    }
  }

  async compare(value: string, hash: string): Promise<Result<boolean>> {
    try {
      return Result.Ok(true)
    } catch (error) {
      return Result.Fail('')
    }
  }
}
