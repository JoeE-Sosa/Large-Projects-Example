import type { Request, Response } from 'express'

export abstract class ExpressController {
  abstract execute(req: Request, res: Response): Promise<Response<any, Record<string, any>>>
}
