import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from 'fastify-type-provider-zod';

async function ErrorHandlerPlugin(app: FastifyInstance) {
    app.setErrorHandler((err, req, reply) => {
        if (hasZodFastifySchemaValidationErrors(err)) {
            return reply.code(400).send({
                error: 'Response Validation Error',
                message: "Request doesn't match the schema",
                statusCode: 400,
                details: {
                    issues: err.validation,
                    method: req.method,
                    url: req.url,
                },
            })
        }
    
        if (isResponseSerializationError(err)) {
            return reply.code(500).send({
                error: 'Internal Server Error',
                message: "Response doesn't match the schema",
                statusCode: 500,
                details: {
                    issues: err.cause.issues,
                    method: err.method,
                    url: err.url,
                },
            })
        }
    })
}

export default fp(ErrorHandlerPlugin, { name: 'errorHandler' });