import { z } from "zod";

const checkAvailabilityDTO = {
    request: {
        query: z.object({
            materialCode: z.coerce.number(),
            distributionCenterCode: z.coerce.number().optional(),
        })
    },
    response: {
        200: z.object({
            materialCode: z.number(),
            available: z.boolean(),
        }),
    },
    args: z.object({
        materialCode: z.number(),
        distributionCenterCode: z.number().optional(),
    }),
} as const;

export type CheckAvailabilityDTO = z.infer<typeof checkAvailabilityDTO.args>;

export default checkAvailabilityDTO;
