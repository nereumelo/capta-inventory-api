export default interface AvailabilityRepository {
    check: (materialCode: number, distributionCenterCode: number | undefined) => Promise<{ materialCode: number, available: boolean }>
}