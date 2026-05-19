const { LOCAL_URL, API_PORT } = process.env

export const ApiConfig = {
  url: LOCAL_URL ?? 'http://localhost',
  port: Number(API_PORT) ?? 3000,
}
