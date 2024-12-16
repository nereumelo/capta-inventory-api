import { env } from "@config/env";
import AppDataSource from "@db/data-source";
import app from "@http/app";

const port = env.APP_PORT;

async function start() {
    await Promise.all([
        app.ready(),
        AppDataSource.initialize(),
    ]);
    
    app.listen({ port }, () => {
        console.log(`🚀 Server is up and running at: http://localhost:${port}\n`);
        console.log(`📚 Explore the API documentation here: http://localhost:${port}/docs`);
    });
}

start();