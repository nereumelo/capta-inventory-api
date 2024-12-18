import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'] as const;
 
export const env = createEnv({
  server: {
    APP_PORT: z.coerce.number().default(3000),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(1521),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    LOG_LEVEL: z.enum(logLevels).default('error'),
  },
  runtimeEnv: process.env,
});