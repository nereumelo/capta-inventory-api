import Availability from "@core/availability/infra/typeorm/entities/availability";

export default interface AvailabilityRepository {
    getStockInfo: (materialCode: number, distributionCenterCode: number | undefined) => Promise<Availability>
}