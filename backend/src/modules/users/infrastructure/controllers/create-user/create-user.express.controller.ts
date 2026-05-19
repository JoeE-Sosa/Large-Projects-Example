import type { Request, Response } from 'express'
import type { ExpressControllerContract } from '@/modules/shared/domain/contracts/express.controller.contract.ts'
import type { CreateUserUseCase } from '@/modules/users/application/create-user/create-user.case.ts'

export class CreateUserController implements ExpressControllerContract {
  private readonly createUserUseCase: CreateUserUseCase

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  execute = async (req: Request, res: Response): Promise<Response<any, Record<any, string>>> => {
    try {
      const { name, role, password, department } = req.validData

      const result = await this.createUserUseCase.execute({ name, role, password, department })
      if (!result.IsSuccess()) return res.status(400).send({ message: result.GetError() })

      return res.status(200).send({ message: '' })
    } catch (error) {
      return res.status(500).send({ message: '' })
    }
  }
}
