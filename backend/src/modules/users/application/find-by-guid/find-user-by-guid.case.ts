import { Result } from "@/modules/shared/domain/patterns/result.pattern.ts";
import type { UserPersistence } from "../../domain/persistence/user.persistence.ts";
import type { FindUserByGuidDTO } from "./find-user-by-guid.dto.ts";
import type { User } from "../../domain/entities/user.entity.ts";

export class FindUserByGuidUseCase {
  private readonly userPersistence: UserPersistence

  constructor(userPersistence: UserPersistence) {
    this.userPersistence = userPersistence
  }

  async execute(data: FindUserByGuidDTO): Promise<Result<User>> {
    try {
      const { guid } = data

      const findResult = await this.userPersistence.findByGuid(guid)
      if(!findResult.IsSuccess()) return Result.Fail(findResult.GetError())
      
      const user = findResult.GetValue()
      
      return Result.Ok(user)
    } catch (error) {
      return Result.Fail("An exception ocurred while trying to find an user.")
    }
  }
}