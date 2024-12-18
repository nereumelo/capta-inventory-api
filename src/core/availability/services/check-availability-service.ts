import { inject, injectable } from "tsyringe";
import AvailabilityRepository from "@core/availability/repositories/availability-repository";
import { type CheckAvailabilityDTO } from "@core/availability/dtos/check-availability";
import Availability from "@core/availability/infra/typeorm/entities/availability";
import Tokens from "@container/tokens";
import Logger from "@logger";

@injectable()
class CheckAvailabilityService {
  private logger: typeof Logger;

  constructor(
    @inject(Tokens.availability.repository)
    private readonly availabilityRepository: AvailabilityRepository,
    @inject(Tokens.logger)
    logger: typeof Logger,
  ) {
    this.logger = logger.child({ module: CheckAvailabilityService.name });
  }

  private checkAvailability(stockInfo: Availability) {
    if (stockInfo.enabledInTransitStock) {
      const totalStock = stockInfo.onHandStock + stockInfo.inTransitStock;

      return totalStock > stockInfo.committedStock;
    }

    return stockInfo.onHandStock > stockInfo.committedStock;
  }

  async execute(args: CheckAvailabilityDTO) {
    const availabilityRepository = this.availabilityRepository;
    const stockInfo = await availabilityRepository.getStockInfo(
      args.materialCode,
      args.distributionCenterCode,
    );

    const isAvailable = this.checkAvailability(stockInfo);
    this.logger.info(
      `Material code ${args.materialCode} is available: ${isAvailable}`,
    );
    return { materialCode: args.materialCode, available: isAvailable };
  }
}

export default CheckAvailabilityService;
