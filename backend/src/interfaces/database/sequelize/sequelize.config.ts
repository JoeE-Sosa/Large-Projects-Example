const { SEQUELIZE_DB_HOST, SEQUELIZE_DB_PORT, SEQUELIZE_DB_USER, SEQUELIZE_DB_PASS, SEQUELIZE_DB_NAME } = process.env

export const config = {
  host: SEQUELIZE_DB_HOST ?? 'localhost',
  port: SEQUELIZE_DB_PORT ?? '1433',
  username: SEQUELIZE_DB_USER ?? 'sa',
  password: SEQUELIZE_DB_PASS ?? 'password',
  database: SEQUELIZE_DB_NAME ?? 'db_test',
}
