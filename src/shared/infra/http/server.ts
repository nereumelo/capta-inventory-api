import { env } from "@config/env";
import AppDataSource from "@db/data-source";
import app from "@http/app";

const port = env.APP_PORT;

async function start() {
  await Promise.all([app.ready(), AppDataSource.initialize()]);

  await app.listen({ port });
  // app.log.info(`🚀 Server is up and running at: http://localhost:${port}`);
  // app.log.info(`📚 Explore the API documentation here: http://localhost:${port}/docs`);
}

start();
