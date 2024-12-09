import { createEnv } from "@t3-oss/env-core";
import { z, ZodError } from "zod";
 
export const env = createEnv({
  server: {
    APP_PORT: z.coerce.number().default(3000),
    APP_HOST: z.string().default("localhost"),
  },
  runtimeEnv: process.env,
});