import {  ZodTypedFastifyFunction } from "@http/types/zod-fastify";
import Availability from "@core/Availability";

type CheckAvailabilitySchema = typeof Availability.Router.schemas.checkAvailability;

export class AvailabilityController {
    static check: ZodTypedFastifyFunction<CheckAvailabilitySchema> = async function (request, reply) {
        const [result] = await this.db.query(`SELECT em.* FROM SISCPT.ESTOQUE_MATERIAL em
            WHERE 1=1
            AND CD_PRODUTO = :productCode
            AND CD_CENTRO = :distributionCenter
            `,
            [
                request.query.productCode,
                request.query.distributionCenter
            ]
        );
        const available = result.QT_LIVRE_UTILIZACAO > result.QT_EMPENHO;
        // console.log(result);
        reply.send(
            { productCode: request.query.productCode, available },
        )
    }
}