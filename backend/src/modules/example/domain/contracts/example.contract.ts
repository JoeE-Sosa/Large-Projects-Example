import type { Result } from '../../../shared/domain/patterns/result.pattern.ts'
import type { Example } from '../entities/example.entity.ts'

export abstract class ExampleContract {
  abstract method1(): Result<void>
  abstract method2(param1: string): Promise<Result<void>>
  abstract method3(param1: string, param2: string): Promise<Result<Example>>
  abstract method4(param1: number): Promise<Result<Example[]>>
}
