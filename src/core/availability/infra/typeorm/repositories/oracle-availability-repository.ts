import AvailabilityRepository from "@core/availability/repositories/availability-repository";
import { DataSource, Repository } from "typeorm";
import Availability from "@core/availability/infra/typeorm/entities/availability";
import { inject, injectable } from "tsyringe";

@injectable()
class OracleAvailabilityRepository implements AvailabilityRepository {
    private repository: Repository<Availability>;
    
    constructor(
        @inject('dataSource')
        private dataSource: DataSource,
    ) {
        this.repository = this.dataSource.manager.getRepository(Availability);
    }

    async check(materialCode: number, distributionCenterCode: number | undefined): Promise<{ materialCode: number, available: boolean }> {
        const result = await this.repository
            .createQueryBuilder("availability")
            .where("availability.materialCode = :materialCode",{ materialCode })
            .andWhere("availability.distributionCenterCode = :distributionCenterCode", { distributionCenterCode })
            .getOne();

        return {
            materialCode,
            available: result!.totalStock > result!.usedStock,
        };
    }
}

export default OracleAvailabilityRepository;
