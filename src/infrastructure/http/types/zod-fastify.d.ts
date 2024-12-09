import { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import {
  FastifySchema,
  FastifyRequest,
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  FastifyReply,
  RawReplyDefaultExpression,
  ContextConfigDefault
} from "fastify";

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
>

type ZodTypedFastifyFunction<TSchema extends FastifySchema> = (
    request: ZodTypedFastifyRequest<TSchema>,
    reply: ZodTypedFastifyReply<TSchema>
) => Promise<void>;

type ZodTypedFastifyAsyncPlugin = FastifyPluginAsyncZod;