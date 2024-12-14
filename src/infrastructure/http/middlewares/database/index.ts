import { AppDataSource } from '@config/db/data-source';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function DatabasePlugin(app: FastifyInstance) {
    const connection = await AppDataSource.initialize();

    app.decorate('db', connection);

    app.addHook('onClose', async () => {
        await connection.destroy();
    });
}

export default fp(DatabasePlugin, { name: 'database' });
