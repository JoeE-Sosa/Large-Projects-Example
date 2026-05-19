import type { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import type { Example } from '../entities/example.entity.ts'

export abstract class ExamplePersistence {
  abstract create(example: Example): Promise<Result<Example>>
  abstract getAll(): Promise<Result<Example[]>>
  abstract findById(id: number): Promise<Result<Example>>
  abstract save(example: Example): Promise<Result<void>>
}
