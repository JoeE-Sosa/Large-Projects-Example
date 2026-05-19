import type { Sequelize } from 'sequelize'
import { InitUserDefinition } from './definitions/user.definition.ts'
import { InitProductDefinition } from './definitions/product.definition.ts'

export function DefineTables(database: Sequelize) {
  const definitions: Record<string, any> = {
    User: InitUserDefinition(database),
    Product: InitProductDefinition(database),
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
