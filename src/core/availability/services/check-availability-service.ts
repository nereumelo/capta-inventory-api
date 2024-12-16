OracleAvailabilityRepository
import { inject, injectable } from "tsyringe";
import AvailabilityRepository from "../repositories/availability-repository";
import OracleAvailabilityRepository from "../infra/typeorm/repositories/oracle-availability-repository";
import { type CheckAvailabilityDTO } from "@core/availability/dtos/check-availability";

@injectable()
class CheckAvailabilityService {

    constructor(
        @inject('AvailabilityRepository')
        private availabilityRepository: AvailabilityRepository,
    ) {}
    async execute(args: CheckAvailabilityDTO) {
        const availabilityRepository = this.availabilityRepository;
        const result = await availabilityRepository.check(args.materialCode, args.distributionCenterCode);

        return result;
    }
}

export default CheckAvailabilityService;
