import { AvailabilityService } from './availability-service';
import { AvailabilityRepository } from './availability-repository';
import { AvailabilityDTO } from './objects/availability-dto';
import { AvailabilityDAO } from './objects/availability-dao';
import { AvailabilityEntity } from './objects/availability-entity';
import { AvailabilityRouter } from './availability-router';
import { AvailabilityController } from './availability-controller';

const Availability = {
    Service: AvailabilityService,
    Repository: AvailabilityRepository,
    DTO: AvailabilityDTO,
    DAO: AvailabilityDAO,
    Entity: AvailabilityEntity,
    Router: AvailabilityRouter,
    Controller: AvailabilityController,
};

export default Availability;
