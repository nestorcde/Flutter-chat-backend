import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  DB_CON: z.string().min(1, 'Database connection string is required'),
  JWT_KEY: z.string().min(1, 'JWT key is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Environment validation failed:', error);
    process.exit(1);
  }
};

export type Environment = z.infer<typeof envSchema>;