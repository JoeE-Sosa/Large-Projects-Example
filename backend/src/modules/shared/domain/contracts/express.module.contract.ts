import type { Router } from 'express'

export interface ExpressModuleContract {
  execute(): Router
}
