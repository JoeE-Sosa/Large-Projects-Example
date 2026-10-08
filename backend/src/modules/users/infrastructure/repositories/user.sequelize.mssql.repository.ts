import type { User } from '../../domain/user.entity.js'
import type { UserPersistence } from '../../domain/user.persistence.js'
import { sequelizeDatabase } from '@/interfaces/database/sequelize/sequelize.database.js'
import { UserSequelizeMSSQLMapper } from './user.sequelize.mssql.mapper.js'

export class UserSequelizeMSSQLRepository implements UserPersistence {
  private readonly model = sequelizeDatabase.instance.model('Users')

  async create(user: User): Promise<User> {
    const userPersistence = UserSequelizeMSSQLMapper.toPersistence(user)
    const userCreated = await this.model.create(userPersistence)
    const userDomain = UserSequelizeMSSQLMapper.toDomain(userCreated.dataValues)
    return userDomain
  }

  async findAll(): Promise<User[]> {
    const usersFound = await this.model.findAll({ where: { disabled: false } })
    const usersDomain = usersFound.map((user) => UserSequelizeMSSQLMapper.toDomain(user.dataValues))
    return usersDomain
  }

  async save(user: User): Promise<void> {
    const userPersistence = UserSequelizeMSSQLMapper.toPersistence(user)
    await this.model.update(userPersistence, { where: { guid: userPersistence.id } })
  }
}
