import type { Response } from 'express'

export function PositiveResponse(res: Response, message: string, content: any) {
  return res.status(200).send({ status: false, message, content })
}

export function PositiveNoContentResponse(res: Response) {
  return res.status(200).send({ status: false, message: '' })
}

export function PositiveCreatedResponse(res: Response) {
  return res.status(201).send({ status: false, message: '' })
}

export function ResultErrorResponse(res: Response, message: string) {
  return res.status(400).send({ status: false, message })
}

export function ValidationErrorResponse(res: Response) {
  return res.status(401).send({ status: false, message: 'Validation error.' })
}

export function ServerErrorResponse(res: Response) {
  return res.status(500).send({ status: false, message: 'Server Error.' })
}
