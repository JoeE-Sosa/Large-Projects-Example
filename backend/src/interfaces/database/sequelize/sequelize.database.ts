import { Sequelize } from 'sequelize'
import { config } from './sequelize.config'
import { DefineTables } from './sequelize.models'

class SequelizeDatabase {
  instance: Sequelize

  constructor() {
    const { database, username, password, host, port } = config
    this.instance = new Sequelize(database, username, password, {
      host,
      port: Number(port),
      dialect: 'mssql',
      logging: false,
    })
    DefineTables(this.instance)
  }

  async migrate() {
    try {
      console.info('🔄 - Migrando la base de datos...')
      await this.instance.authenticate()

      const queryInterface = this.instance.getQueryInterface()
      const tables = await queryInterface.showAllTables()
      for (const table of tables) {
        const fks = (await queryInterface.getForeignKeyReferencesForTable(table)) as { constraintName: string }[]
        for (const fk of fks) {
          if (fk.constraintName) await queryInterface.removeConstraint(table, fk.constraintName)
        }
      }

      await queryInterface.dropAllTables()

      await this.instance.sync({ force: true })
      console.info('✅ - Migración completada.')
    } catch (error) {
      console.error('❌ - Migración fallida:', error)
      throw error
    } finally {
      await this.instance.close()
    }
  }

  async connect() {
    try {
      await this.instance.authenticate()
      // await this.instance.sync()
      console.info('\t✅ - Servidor DB en linea.')
    } catch (error) {
      console.error('\t❌ - No se pudo conectar a la base de datos: ', error)
      throw error
    }
  }

  async disconnect() {
    try {
      await this.instance.close()
      console.info('\t🔽 - Servidor DB desconectado.')
    } catch (error) {
      console.error('\t❌ - No se pudo desconectar de la base de datos: ', error)
      throw error
    }
  }
}

export const sequelizeDatabase = new SequelizeDatabase()
