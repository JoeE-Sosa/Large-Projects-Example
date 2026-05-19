import { Sequelize } from 'sequelize'
import { databaseConfig } from './config.ts'
import { DefineTables } from './definitions.ts'

class SequelizeDatabase {
  public readonly instance

  constructor() {
    const { name, username, password, host, port } = databaseConfig
    this.instance = new Sequelize(name, username, password, { host, port, dialect: 'mssql' })
    DefineTables(this.instance)
  }

  async connect({ force }: { force: boolean }) {
    try {
      await this.instance.sync({ force })
      await this.instance.authenticate()
      console.info('✅ - Sequelize Database connection was successful.')
    } catch (error) {
      console.error('❌ - Sequelize Database connection failed.')
      throw error
    }
  }

  async disconnect() {
    try {
      await this.instance.close()
      console.info('✅ - Sequelize Database disconnection was successful.')
    } catch (error) {
      console.error('❌ - Sequelize Database disconnection failed.')
      throw error
    }
  }
}

export const sequelizeDatabase = new SequelizeDatabase()
