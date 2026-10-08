import type { EncryptServiceContract } from "@/modules/shared/domain/contracts/encrypt.service.contract";
import type { UserPersistence } from "../../domain/user.persistence";
import { Result } from "@/modules/shared/domain/patterns/result.pattern";
import type { ChangePasswordDTO } from "./change-password.dto";
import { PasswordVO } from "../../domain/value-objects/password.vo";

export class ChangePasswordUseCase {
  private readonly encryptService: EncryptServiceContract
  private readonly userPersistence: UserPersistence

  constructor(userPersistence: UserPersistence, encryptService: EncryptServiceContract) {
    this.userPersistence = userPersistence
    this.encryptService = encryptService
  }

  async execute(data: ChangePasswordDTO): Promise<Result<void>> {
    try {
      const { guid, password } = data

      const findResult = await this.userPersistence.findByGuid(guid)
      if(!findResult.IsSuccess()) return Result.Fail(findResult.GetError())
      const user = findResult.GetValue()
      
      const correctPasswordRes = await PasswordVO.create(password, this.encryptService)
      if(!correctPasswordRes) return Result.Fail(correctPasswordRes.)

      return Result.Ok(null)
    } catch (error) {
      return Result.Fail("")
    }
  }
}