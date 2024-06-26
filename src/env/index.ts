import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true }) // for create table test.db, set 'override: true'
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('prod'),
  DATA_BASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATA_BASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Deu Pau 😁👍', _env.error.format())

  throw new Error('Deu Pau Mermão... Algo de errado não tá certo!')
}

export const env = _env.data
