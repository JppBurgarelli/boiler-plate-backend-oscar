import 'dotenv/config';

import { z } from 'zod';

const serverEnvSchema = {
  APP_PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
};

const databaseEnvSchema = {
  ORACLE_DB_HOST: z.string().min(1, 'Database host is required'),
  ORACLE_DB_NAME: z.string().min(1, 'Database username is required'),
  ORACLE_DB_PASSWORD: z.string().min(1, 'Database password is required'),
  ORACLE_DB_SERVICE_NAME: z
    .string()
    .min(1, 'Database service name is required'),
};

const envSchema = z.object({
  ...serverEnvSchema,
  ...databaseEnvSchema,
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
