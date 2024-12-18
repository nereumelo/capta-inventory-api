import AvailabilityRouter from "@core/availability/infra/http/routes/availability-router";
import CheckAvailabilityService from "@core/availability/services/check-availability-service";
import { ZodTypedFastifyFunction } from "@http/types/zod-fastify";
import { container } from "tsyringe";

type CheckAvailabilitySchema =
  typeof AvailabilityRouter.schemas.checkAvailability;

class AvailabilityController {
  check: ZodTypedFastifyFunction<CheckAvailabilitySchema> = async function (
    req,
    res,
  ) {
    try {
      const { materialCode, distributionCenterCode } = req.query;

      const checkAvailabilityService = container.resolve(
        CheckAvailabilityService,
      );

      const result = await checkAvailabilityService.execute({
        materialCode,
        distributionCenterCode,
      });

      return res.send(result);
    } catch (error) {
      console.log(error);
    }
  };
}

export default AvailabilityController;
