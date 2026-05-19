import type { NextFunction, Request, Response } from 'express'

export abstract class ExpressSchemaContract {
  abstract execute(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void>
}
