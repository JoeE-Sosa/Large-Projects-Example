import type { NextFunction, Request, Response } from 'express'

export abstract class ExpressMiddlewareContract {
  abstract execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any, Record<string, any>> | undefined>
}
