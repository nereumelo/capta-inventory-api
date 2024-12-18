import fastify from "fastify";
import { ulid } from "ulid";
import { container } from "tsyringe";
import "@container";
import routes from "@http/routes";
import Tokens from "@container/tokens";
import middlewares from "@http/middlewares";

const app = fastify({
  genReqId: () => ulid(),
  requestIdLogLabel: "requestId",
  loggerInstance: container.resolve(Tokens.logger),
});

app.register(middlewares);
app.register(routes);

export default app;
