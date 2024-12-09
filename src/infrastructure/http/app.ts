import fastify from "fastify";
import middlewares from "@http/middlewares";
import routes from "@http/routes";

const app = fastify();

app.register(middlewares);
app.register(routes);

export default app;
