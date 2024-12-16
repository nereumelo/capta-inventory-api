import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

async function TypeProviderPlugin(app: FastifyInstance) {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);
}

export default fp(TypeProviderPlugin, { name: 'typeProvider' });