import { FastifyInstance } from "fastify"
import Availability from "@core/Availability";
import Commitment from "@core/Commitment";

export const v1Routes = async (app: FastifyInstance) => {
    app.register(Availability.Router.setup, { prefix: '/availability' },);
    app.register(Commitment.Router.setup, { prefix: '/commitment' });
};