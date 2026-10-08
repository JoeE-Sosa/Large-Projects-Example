import type { Sequelize } from 'sequelize'
import { InitUserModel } from './models/sequelize.user.model'
import { InitProductModel } from './models/sequelize.product.model'

export function DefineTables(database: Sequelize) {
  const definitions: Record<string, any> = {
    User: InitUserModel(database),
    Product: InitProductModel(database),
  }

  Object.keys(definitions).forEach((definition) => {
    try {
      if ('associate' in definitions[definition]) definitions[definition].associate(definitions)
    } catch (error) {
      console.error('❌ - Definitions errors')
      throw error
    }
  })
}
