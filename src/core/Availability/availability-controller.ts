import { ZodTypedFastifyFunction } from "@http/types/zod-fastify";
import Availability from "@core/Availability";

type CheckAvailabilitySchema = typeof Availability.Router.schemas.checkAvailability;

export class AvailabilityController {
    static check: ZodTypedFastifyFunction<CheckAvailabilitySchema> = async (request, reply) => {
        reply.send(
            { productCode: request.query.productCode, available: true },
        )
    }
}