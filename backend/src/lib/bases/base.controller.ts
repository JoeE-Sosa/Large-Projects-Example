import type { Request, Response } from 'express'

export interface BaseController {
  execute(req: Request, res: Response): Promise<Response<any, Record<string, any>>>
}
