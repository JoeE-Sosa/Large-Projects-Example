import type { Router } from 'express'

export abstract class ExpressModuleContract {
  abstract execute(): Router
}
