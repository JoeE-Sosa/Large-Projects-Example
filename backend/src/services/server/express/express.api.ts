import express, { type Express, type Request, type Response } from 'express'
import type { Server } from 'node:http'

import { ApiConfig } from '../config.ts'
import { GetRoutes } from '@/modules/routes.express.module.ts'

class ExpressServer {
  private readonly port: number
  private readonly api: Express
  private instance: Server | null = null

  constructor() {
    const { port } = ApiConfig
    this.port = port

    this.api = express()
    this.api.disable('x-powered-by')
    this.api.set('trust proxy', true)

    this.api.use('/api/v1', GetRoutes())
  }

  async connect() {
    try {
      this.instance = this.api.listen(this.port, () =>
        console.info(`✅ - Express API server running at http://localhost:${this.port}/api/v1`),
      )
    } catch (error) {
      console.error('❌ - ')
      throw error
    }
  }

  async disconnect() {
    try {
      this.instance?.close()
    } catch (error) {
      console.error('❌ - ')
      throw error
    }
  }
}

export const apiExpress = new ExpressServer()
