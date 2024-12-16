import fp from 'fastify-plugin';
import { FastifyInstance } from "fastify";
import { v1Routes } from "@http/routes/v1";

export async function setRoutes(app: FastifyInstance) {
    app.register(v1Routes, { prefix: '/v1' });
}

export default fp(setRoutes, { name: 'routes' });
