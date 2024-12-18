import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  FastifySchema,
  FastifyRequest,
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  FastifyReply,
  RawReplyDefaultExpression,
  ContextConfigDefault,
  FastifyInstance,
  FastifyPluginOptions,
} from "fastify";

type InstanceDecorators = {};

type ZodTypedFastifyInstance = InstanceDecorators &
  FastifyInstance<
    Server<typeof IncomingMessage, typeof ServerResponse>,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    ZodTypeProvider
  >;

type ZodTypedFastifyRequest<TSchema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  TSchema,
  ZodTypeProvider
>;

type ZodTypedFastifyReply<TSchema extends FastifySchema> = FastifyReply<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  ContextConfigDefault,
  TSchema,
  ZodTypeProvider
>;

type ZodTypedFastifyFunction<TSchema extends FastifySchema> = (
  this: ZodTypedFastifyInstance,
  request: ZodTypedFastifyRequest<TSchema>,
  reply: ZodTypedFastifyReply<TSchema>,
) => Promise<void>;

type ZodTypedFastifyAsyncPlugin = (
  app: ZodTypedFastifyInstance,
  options?: FastifyPluginOptions,
) => Promise<void>;
