const { SEQUELIZE_DB_NAME, SEQUELIZE_DB_USER, SEQUELIZE_DB_PASS, SEQUELIZE_DB_HOST, SEQUELIZE_DB_PORT } = process.env

export const databaseConfig = {
  name: SEQUELIZE_DB_NAME ?? 'database',
  username: SEQUELIZE_DB_USER ?? 'sa',
  password: SEQUELIZE_DB_PASS ?? '1234',
  host: SEQUELIZE_DB_HOST ?? 'localhost',
  port: Number(SEQUELIZE_DB_PORT) ?? 1433,
}
