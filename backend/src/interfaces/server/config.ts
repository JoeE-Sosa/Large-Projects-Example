const { API_PORT = 3000, ALLOWED_ORIGINS = ['http://localhost:3000'] } = process.env

export const config = {
  ALLOWED_ORIGINS,
  API_PORT: Number(API_PORT),
}
