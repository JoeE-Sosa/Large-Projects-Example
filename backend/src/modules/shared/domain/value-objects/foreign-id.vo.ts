import { Result } from '../patterns/result.pattern.ts'
import { ValueObjectContract } from './value-objects.contract.ts'

export class ForeignIdVO extends ValueObjectContract<number | null> {
  static async create(value: number | null): Promise<Result<ForeignIdVO>> {
    try {
      if (!value) return Result.Fail('')

      return Result.Ok(new ForeignIdVO(value))
    } catch (error) {
      return Result.Fail('')
    }
  }
}
