import cookieParser from 'cookie-parser'

export function CookieParserMiddleware() {
  return cookieParser()
}