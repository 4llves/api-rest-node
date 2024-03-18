import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('prod'),
  DATA_BASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Deu Pau 😁👍', _env.error.format())

  throw new Error('Deu Pau Mermão... Algo de errado não tá certo!')
}

export const env = _env.data
