import { ZodTypedFastifyAsyncPlugin } from "@http/types/zod-fastify";
import AvailabilityController from "@core/availability/infra/http/controllers/availability-controller";
import checkAvailabilityDTO from "@core/availability/dtos/check-availability";

export const getSchemas = () =>
  ({
    checkAvailability: {
      operationId: "checkAvailability",
      summary: "Check Product Availability",
      description: "Check Product Availability by Product Code",
      querystring: checkAvailabilityDTO.request.query,
      tags: ["Availability"],
      response: {
        200: checkAvailabilityDTO.response[200],
      },
    },
  }) as const;

class AvailabilityRouter {
  static get schemas() {
    return getSchemas();
  }
  static setup: ZodTypedFastifyAsyncPlugin = async (app) => {
    app.get(
      "/check",
      {
        schema: getSchemas().checkAvailability,
      },
      new AvailabilityController().check.bind(app),
    );
  };
}

export default AvailabilityRouter;
