import { Result } from '@/modules/shared/domain/patterns/result.pattern.ts'
import type { User } from '../../domain/entities/user.entity.ts'
import type { UserPersistence } from '../../domain/persistence/user.persistence.ts'
import { sequelizeDatabase } from '@/services/database/sequelize/database.ts'
import { UserSequelizeMSSQLMapper } from './user.sequelize.mssql.mapper.ts'

export class UserSequelizeMSSQLRepository implements UserPersistence {
  private readonly model: ModelCtor<Model>

  constructor() {
    this.model = sequelizeDatabase.instance.model("User")
  }

  async create(user: User): Promise<Result<User>> {
    try {
      const userPersistence = UserSequelizeMSSQLMapper.toPersistence(user)
      const userCreated = await this.model.create(userPersistence)
      const userDomain = UserSequelizeMSSQLMapper.toDomain(userCreated.dataValues)

      return Result.Ok(userDomain)
    } catch (error) {
      return Result.Fail("Database failed to create an user.")
    }
  }

  async findAll(): Promise<Result<User[]>> {
    try {
      const usersFound = await this.model.findAll({ where: {disabled: false } })
      const usersDomain = usersFound.map((user) => UserSequelizeMSSQLMapper.toDomain(user.dataValues))

      return Result.Ok(usersDomain)
    } catch (error) {
      return Result.Fail("Database failed to find all users.")
    }
  }

  async findByGuid(guid: string): Promise<Result<User>> {
    try {
      const userFound = await this.model.findOne({ where: { guid, disabled: false } })
      const userDomain = UserSequelizeMSSQLMapper.toDomain(userFound.dataValues)
      
      return Result.Ok(userDomain)
    } catch (error) {
      return Result.Fail("Database failed to find an user by guid.")
    }
  }

  async save(user: User): Promise<Result<void>> {
    try {
      const userPersistence = UserSequelizeMSSQLMapper.toPersistence(user)
      await this.model.update(userPersistence, { where: { guid: userPersistence.guid}})
      
      return Result.Ok(null)
    } catch (error) {
      return Result.Fail("Database failed to save an user.")
    }
  }
}
