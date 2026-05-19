import { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import type { ExamplePersistence } from '../../domain/persistance/example.persistence.ts'
import type { OneUseCaseDTO } from './one-use-case.dto.ts'

export class OneUseCaseUseCase {
  private readonly examplePersistence: ExamplePersistence

  constructor(examplePersistence: ExamplePersistence) {
    this.examplePersistence = examplePersistence
  }

  async execute(data: OneUseCaseDTO): Promise<Result<void>> {
    try {
      const { param2 } = data

      const getAllResult = await this.examplePersistence.findById(param2)
      if (!getAllResult.IsSuccess()) return Result.Fail(getAllResult.GetError())

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail('This is an use case example.')
    }
  }
}
