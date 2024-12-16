import AvailabilityRepository from "@core/availability/repositories/availability-repository";
import { DataSource, Repository } from "typeorm";
import { inject, injectable } from "tsyringe";
import Availability from "@core/availability/infra/typeorm/entities/availability";

@injectable()
class OracleAvailabilityRepository implements AvailabilityRepository {
    private repository: Repository<Availability>;
    
    constructor(
        @inject('dataSource')
        private readonly dataSource: DataSource,
    ) {
        this.repository = this.dataSource.manager.getRepository(Availability);
    }

    async getStockInfo(materialCode: number, distributionCenterCode: number | undefined): Promise<Availability> {
        const stockInfo = await this.repository
            .createQueryBuilder("availability")
            .where("availability.materialCode = :materialCode",{ materialCode })
            .andWhere("availability.distributionCenterCode = :distributionCenterCode", { distributionCenterCode })
            .getOne();

        if (!stockInfo) {
            throw new Error("Stock info not found for material code: " + materialCode);
        }

        return stockInfo;
    }
}

export default OracleAvailabilityRepository;
