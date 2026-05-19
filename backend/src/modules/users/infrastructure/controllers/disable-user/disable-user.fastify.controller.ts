import type { FastifyRequest, FastifyReply } from 'fastify'
import type { FastifyControllerContract } from '@/modules/shared/domain/contracts/fastify.controller.contract.ts'
import { DisableUserUseCase } from '@/modules/users/application/disable-user/disable-user.case.ts'
import {
  PositiveNoContentResponse,
  ResultErrorResponse,
  ServerErrorResponse,
} from '@/services/server/fastify/fastify.responses.ts'

export class DisableUserController implements FastifyControllerContract {
  private readonly disableUserUseCase: DisableUserUseCase

  constructor(disableUserUseCase: DisableUserUseCase) {
    this.disableUserUseCase = disableUserUseCase
  }

  execute = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | undefined> => {
    try {
      const { guid } = request.validData

      const result = await this.disableUserUseCase.execute({ guid })
      if (!result.IsSuccess()) return ResultErrorResponse(reply, result.GetError())

      return PositiveNoContentResponse(reply)
    } catch (error) {
      return ServerErrorResponse(reply)
    }
  }
}
