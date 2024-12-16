import AvailabilityRouter from "@core/availability/infra/http/routes/availability-router";
import { ZodTypedFastifyAsyncPlugin } from "@http/types/zod-fastify";

export const v1Routes: ZodTypedFastifyAsyncPlugin = async (app) => {
    app.register(AvailabilityRouter.setup, { prefix: '/availability' },);
};