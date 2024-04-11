import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATA_BASE_CLIENT,
  connection:
    env.DATA_BASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATA_BASE_URL,
        }
      : env.DATA_BASE_CLIENT,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
