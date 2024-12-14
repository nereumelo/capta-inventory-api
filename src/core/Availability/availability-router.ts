import { ZodTypedFastifyAsyncPlugin } from "@http/types/zod-fastify";
import Availability from '@core/Availability';

const getSchemas = () => ({
    checkAvailability: {
        operationId: 'checkAvailability',
        summary: 'Check Product Availability',
        description: 'Check Product Availability by Product Code',
        querystring: Availability.DTO.check.request,
        tags: ['Availability'],
        response: {
            200: Availability.DTO.check.response[200],
        },
    }
} as const);

export class AvailabilityRouter {
    static get schemas() {
        return getSchemas();
    }

    static setup: ZodTypedFastifyAsyncPlugin = async (app) => {
        app.get('/check', {
            schema: Availability.Router.schemas.checkAvailability,
        }, Availability.Controller.check.bind(app));
    };
}