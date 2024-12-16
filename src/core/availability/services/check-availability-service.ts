OracleAvailabilityRepository
import { inject, injectable } from "tsyringe";
import AvailabilityRepository from "../repositories/availability-repository";
import OracleAvailabilityRepository from "@core/availability/infra/typeorm/repositories/oracle-availability-repository";
import { type CheckAvailabilityDTO } from "@core/availability/dtos/check-availability";
import Availability from "@core/availability/infra/typeorm/entities/availability";

@injectable()
class CheckAvailabilityService {
    constructor(
        @inject('AvailabilityRepository')
        private readonly availabilityRepository: AvailabilityRepository,
    ) {}

    private checkAvailability(stockInfo: Availability) {
        if (stockInfo.enabledInTransitStock) {
            const totalStock = stockInfo.onHandStock + stockInfo.inTransitStock;

            return totalStock > stockInfo.committedStock;
        }

        return stockInfo.onHandStock > stockInfo.committedStock;
    }

    async execute(args: CheckAvailabilityDTO) {
        const availabilityRepository = this.availabilityRepository;
        const stockInfo = await availabilityRepository.getStockInfo(args.materialCode, args.distributionCenterCode);

        const isAvailable = this.checkAvailability(stockInfo);
        return { materialCode: args.materialCode, available: isAvailable };
    }
}

export default CheckAvailabilityService;
