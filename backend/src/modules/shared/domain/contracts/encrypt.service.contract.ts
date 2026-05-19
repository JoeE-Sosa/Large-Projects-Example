import type { Result } from '../patterns/result.pattern.ts'

export abstract class EncryptServiceContract {
  abstract hash(value: string): Promise<Result<string>>
  abstract compare(value: string, hash: string): Promise<Result<boolean>>
}
