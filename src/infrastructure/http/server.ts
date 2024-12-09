import { env } from "@config/env";
import app from "@http/app";

const port = env.APP_PORT;
const host = env.APP_HOST;

async function start() {
    await app.ready();

    app.listen({ port, host }, () => {
        console.log(`🚀 Server is up and running at: http://${host}:${port}\n`);
        console.log(`📚 Explore the API documentation here: http://${host}:${port}/docs`);
    });
}

start();