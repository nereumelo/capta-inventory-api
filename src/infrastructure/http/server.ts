import { env } from "@config/env";
import app from "@http/app";

const port = env.APP_PORT;

async function start() {
    await app.ready();

    app.listen({ port }, () => {
        console.log(`🚀 Server is up and running at: http://localhost:${port}\n`);
        console.log(`📚 Explore the API documentation here: http://localhost:${port}/docs`);
    });
}

start();