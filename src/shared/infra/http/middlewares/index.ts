import fp from 'fastify-plugin';
import { FastifyInstance } from "fastify";
import swagger from "@http/middlewares/swagger";
import typeProvider from "@http/middlewares/type-provider";
import errorHandler from '@http/middlewares/error-handler';

export async function setMiddlewares(app: FastifyInstance) {
    app.register(errorHandler);
    app.register(typeProvider);
    app.register(swagger);
}

export default fp(setMiddlewares, { name: 'middlewares' });
