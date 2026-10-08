import type { Response } from 'express'

const InvalidFields = 'Invalid fields in the request.'
const ServerError = 'Internal server error.'
const AuthenticationError = 'Incorrect credentials.'
const AuthorizationError = 'The user does not have permission to perform this action.'

export function PositiveResponse(res: Response, { message, content = {} }: { message: string; content?: any }) {
  return res.status(200).send({ state: true, message, content })
}

export function PositiveCreatedResponse(res: Response, { message }: { message: string }) {
  return res.status(201).send({ state: true, message })
}

export function PositiveNoContentResponse(res: Response, { message }: { message: string }) {
  return res.status(204).send({ state: true, message })
}

export function ResultErrorResponse(res: Response, { message }: { message: string }) {
  return res.status(400).send({ state: false, message })
}

export function ValidationErrorResponse(res: Response, { errors }: { errors: any[] }) {
  return res.status(400).send({ state: false, message: InvalidFields, errors })
}

export function AuthenticationErrorResponse(res: Response) {
  return res.status(401).send({ state: false, message: AuthenticationError })
}

export function AuthorizationErrorResponse(res: Response) {
  return res.status(403).send({ state: false, message: AuthorizationError })
}

export function NotFoundResponse(res: Response, { message }: { message: string }) {
  return res.status(404).send({ state: false, message })
}

export function ServerErrorResponse(res: Response) {
  return res.status(500).send({ state: false, message: ServerError })
}
