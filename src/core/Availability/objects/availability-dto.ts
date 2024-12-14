import { z } from "zod";

export class AvailabilityDTO {
    static readonly check = {
        request: z.object({
            productCode: z.string(),
            distributionCenter: z.string()
        }),
        response: {
            200: z.object({
                productCode: z.string(),
                available: z.boolean()
            }),
        }
    }
}