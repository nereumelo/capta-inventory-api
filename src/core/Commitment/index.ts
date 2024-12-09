import { CommitmentController } from "./commitment-controller";
import { CommitmentRepository } from "./commitment-repository";
import { CommitmentRouter } from "./commitment-router";
import { CommitmentService } from "./commitment-service";
import { CommitmentDAO } from "./objects/commitment-dao";
import { CommitmentDTO } from "./objects/commitment-dto";
import { CommitmentEntity } from "./objects/commitment-entity";

const Commitment = {
    Service: CommitmentService,
    Repository: CommitmentRepository,
    DTO: CommitmentDTO,
    DAO: CommitmentDAO,
    Entity: CommitmentEntity,
    Router: CommitmentRouter,
    Controller: CommitmentController,
};

export default Commitment;
