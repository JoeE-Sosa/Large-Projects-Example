import morgan from 'morgan'

export function MorganMiddleware() {
  return morgan('dev')
}
