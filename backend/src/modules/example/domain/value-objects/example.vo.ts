import { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import { ValueObjectContract } from '../../../shared/domain/value-objects/value-objects.contract.ts'

export class ExampleVO extends ValueObjectContract<string | number> {
  async create(value: string | number): Promise<Result<ExampleVO>> {
    try {
      if (!value) return Result.Fail('Value can not be undefined.')

      return Result.Ok(new ExampleVO(value))
    } catch (error) {
      return Result.Fail('')
    }
  }
}
