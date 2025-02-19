import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  OPENAI_API_KEY: z.string(),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'), // 15 minutes
  RATE_LIMIT_MAX: z.string().default('100'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.string().default('5432'),
});

const env = envSchema.safeParse(process.env);
if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format());
  process.exit(1);
}

export const config = {
  ...env.data,
  PORT: parseInt(env.data.PORT),
  RATE_LIMIT_WINDOW_MS: parseInt(env.data.RATE_LIMIT_WINDOW_MS),
  RATE_LIMIT_MAX: parseInt(env.data.RATE_LIMIT_MAX),
  isDevelopment: env.data.NODE_ENV === 'development',
  isProduction: env.data.NODE_ENV === 'production',
  isTest: env.data.NODE_ENV === 'test',
};
