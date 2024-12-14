import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    APP_PORT: z.coerce.number().default(3000),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(1521),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
  },
  runtimeEnv: process.env,
});