import AvailabilityRepository from "@core/availability/repositories/availability-repository";
import { DataSource, Repository } from "typeorm";
import { inject, injectable, registry } from "tsyringe";
import Availability from "@core/availability/infra/typeorm/entities/availability";
import Tokens from "@container/tokens";
import Logger from "@logger";

@injectable()
class OracleAvailabilityRepository implements AvailabilityRepository {
    private repository: Repository<Availability>;
    private logger: typeof Logger;
    
    constructor(
        @inject(Tokens.datasource)
        dataSource: DataSource,
        @inject(Tokens.logger)
        logger: typeof Logger
    ) {
        this.repository = dataSource.manager.getRepository(Availability);
        this.logger = logger.child({ module: OracleAvailabilityRepository.name });
    }

    async getStockInfo(materialCode: number, distributionCenterCode: number | undefined): Promise<Availability> {
        const stockInfo = await this.repository
            .createQueryBuilder("availability")
            .where("availability.materialCode = :materialCode",{ materialCode })
            .andWhere("availability.distributionCenterCode = :distributionCenterCode", { distributionCenterCode })
            .getOne();

        this.logger.info("Stock info found for material code: " + materialCode);

        if (!stockInfo) {
            throw new Error("Stock info not found for material code: " + materialCode);
        }

        return stockInfo;
    }
}

export default OracleAvailabilityRepository;
