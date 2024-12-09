import { ZodTypedFastifyFunction } from "@http/types/zod-fastify";
import Commitment from "@core/Commitment";

type CreateCommitmentSchema = typeof Commitment.Router.schemas.createCommitment;
type UpdateCommitmentSchema = typeof Commitment.Router.schemas.updateCommitment;
type ReleaseCommitmentSchema = typeof Commitment.Router.schemas.releaseCommitment;

export class CommitmentController {
    static create: ZodTypedFastifyFunction<CreateCommitmentSchema> = async (request, reply) => {
        reply.send(
            { productCode: request.query.productCode, available: true },
        );
    }

    static update: ZodTypedFastifyFunction<UpdateCommitmentSchema> = async (request, reply) => {
        reply.send(
            { productCode: request.query.productCode, available: true },
        );
    }

    static release: ZodTypedFastifyFunction<ReleaseCommitmentSchema> = async (request, reply) => {
        reply.send(
            { productCode: request.query.productCode, available: true },
        );
    }
}