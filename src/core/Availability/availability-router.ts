import { z } from "zod";
import { ZodTypedFastifyAsyncPlugin } from "@http/types/zod-fastify";
import Availability from '@core/Availability';

const schemas = {
    checkAvailability: {
        operationId: 'checkAvailability',
        summary: 'Check Product Availability',
        description: 'Check Product Availability by Product Code',
        querystring: z.object({ productCode: z.string() }),
        tags: ['Availability'],
        response: {
            200: z.object({ productCode: z.string(), available: z.boolean() }),
        },
    }
} as const;

export class AvailabilityRouter {
    static get schemas() {
        return schemas;
    }

    static setup: ZodTypedFastifyAsyncPlugin = async (app) => {
        app.get('/check', {
            schema: schemas.checkAvailability,
            handler: Availability.Controller.check,
        });
    };
}