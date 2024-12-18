import path from "node:path";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifySwagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import ScalarApiReference, {
  FastifyApiReferenceOptions,
} from "@scalar/fastify-api-reference";

const swaggerConfig: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: "Capta Estoque API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
  transformObject: createJsonSchemaTransformObject({
    schemas: {},
  }),
};

const swaggerUiConfig: FastifyApiReferenceOptions = {
  routePrefix: "/docs",
  configuration: {
    metaData: {
      title: "Docs - Capta Estoque API",
    },
    theme: "elysiajs",
    hideModels: true,
    hideClientButton: true,
  },
};

async function writeSwaggerFile(app: FastifyInstance) {
  const docsPath = path.resolve(__dirname, "../../docs");
  const swagger = JSON.stringify(app.swagger(), null, 4);

  if (!existsSync(docsPath)) {
    await mkdir(docsPath);
  }

  await writeFile(`${docsPath}/swagger.json`, swagger);
}

async function SwaggerPlugin(app: FastifyInstance) {
  app.register(fastifySwagger, swaggerConfig);
  app.register(ScalarApiReference, swaggerUiConfig);

  app.addHook("onListen", async () => {
    await writeSwaggerFile(app);
  });
}

export default fp(SwaggerPlugin, { name: "swagger" });
