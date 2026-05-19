import type { Result } from '../patterns/result.pattern.ts'
import type { StorageResponse } from '../types/storage-response.type.ts'

export abstract class StorageServiceContract {
  abstract saveFile(file: File): Promise<Result<StorageResponse>>
  abstract saveLogo(file: File): Promise<Result<StorageResponse>>
  abstract deleteFile(filename: string): Promise<Result<StorageResponse>>
}
