import { z } from "zod";
import { ZodTypedFastifyAsyncPlugin } from "@http/types/zod-fastify";
import Commitment from "@core/Commitment";

const schemas = {
    createCommitment: {
        operationId: 'commitmentCreate',
        summary: 'Create Commitment',
        description: 'Create Commitment',
        querystring: z.object({ productCode: z.string() }),
        tags: ['Commitment'],
        response: {
            200: z.object({ productCode: z.string(), available: z.boolean() }),
        }
    },
    updateCommitment: {
        operationId: 'commitmentUpdate',
        summary: 'Update Commitment',
        description: 'Update Commitment',
        querystring: z.object({ productCode: z.string() }),
        tags: ['Commitment'],
        response: {
            200: z.object({ productCode: z.string(), available: z.boolean() }),
        }
    },
    releaseCommitment: {
        operationId: 'commitmentRelease',
        summary: 'Release Commitment',
        description: 'Release Commitment when order is aborted',
        querystring: z.object({ productCode: z.string() }),
        tags: ['Commitment'],
        response: {
            200: z.object({ productCode: z.string(), available: z.boolean() }),
        }
    }
} as const;

export class CommitmentRouter {
    static get schemas() {
        return schemas;
    }

    static setup: ZodTypedFastifyAsyncPlugin = async (app) => {
        app.post('/create', {
            schema: schemas.createCommitment,
            handler: Commitment.Controller.create
        });

        app.put('/update', {
            schema: schemas.updateCommitment,
            handler: Commitment.Controller.update
        });

        app.put('/release', {
            schema: schemas.releaseCommitment,
            handler: Commitment.Controller.release
        });
    }
}