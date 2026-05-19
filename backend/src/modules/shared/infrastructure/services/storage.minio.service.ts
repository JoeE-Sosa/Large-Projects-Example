import { Result } from '../../domain/patterns/result.pattern.ts'
import type { StorageServiceContract } from '../../domain/contracts/storage.service.contract.ts'
import type { StorageResponse } from '../../domain/types/storage-response.type.ts'

export class MinioService implements StorageServiceContract {
  async saveFile(file: File): Promise<Result<StorageResponse>> {
    try {
      return Result.Ok({ filename: '' })
    } catch (error) {
      return Result.Fail('')
    }
  }

  async saveLogo(file: File): Promise<Result<StorageResponse>> {
    try {
      return Result.Ok({ filename: '' })
    } catch (error) {
      return Result.Fail('')
    }
  }

  async deleteFile(filename: string): Promise<Result<StorageResponse>> {
    try {
      return Result.Ok({ filename: '' })
    } catch (error) {
      return Result.Fail('')
    }
  }
}
