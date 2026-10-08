import { Model } from 'sequelize'

export class BaseModel extends Model {
  declare id: string
  declare disabled: boolean
  declare removed: boolean
  declare creationDate: Date
  declare lastUpdate: Date
}
