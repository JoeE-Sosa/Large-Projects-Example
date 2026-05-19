import { Router } from 'express'
import type { ExpressModuleContract } from '../shared/domain/contracts/express.module.contract.ts'

export class ExampleModule implements ExpressModuleContract {
  execute(): Router {
    return Router()
  }
}
