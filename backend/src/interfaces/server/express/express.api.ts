import express, { type Express, type Request, type Response } from 'express'
import type { Server } from 'node:http'

import { corsMiddleware } from './middlewares/cors'
import { CookieParserMiddleware } from './middlewares/cookieParser'
import { MorganMiddleware } from './middlewares/morgan'

import { GetRoutes } from './express.routes'
import { config } from '../config'

class ExpressServer {
  private readonly api: Express
  private readonly port: number
  private instance: Server | null = null

  constructor() {
    const { API_PORT } = config
    this.port = API_PORT

    this.api = express()
    this.setup()
  }

  setup() {
    this.api.disable('x-powered-by')

    this.api.use(express.json())
    this.api.use(express.urlencoded({ extended: true }))
    this.api.use(corsMiddleware())
    this.api.use(CookieParserMiddleware())
    this.api.use(MorganMiddleware())

    this.api.get('/', (_, res: Response) => {
      return res.redirect('/api')
    })

    this.api.get('/api', (_, res: Response) => {
      return res.status(200).send({ message: 'Large Project Example.' })
    })

    this.api.get('/api/v1/health', (_, res: Response) => {
      return res
        .status(200)
        .send({ name: 'Large Project Example', server: 'express', version: '0.0.1', status: 'Active' })
    })

    this.api.use('/api/v1', GetRoutes())
  }

  async connect() {
    try {
      this.instance = this.api.listen(this.port, () => {
        console.info('\t✅ - Servidor API en linea.')
      })
    } catch (error) {
      console.error('\t❌ - No se pudo conectar al servidor API: ', error)
      throw error
    }
  }

  async disconnect() {
    try {
      this.instance?.close()
      console.info('\t🔽 - Servidor API desconectado.')
    } catch (error) {
      console.error('\t❌ - No se pudo cerrar la conexion al servidor de la API: ', error)
      throw error
    }
  }
}

export const apiExpress = new ExpressServer()
