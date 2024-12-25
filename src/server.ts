import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
} from "fastify-type-provider-zod";
import { sumRoute } from "./sumRoute";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API de Exemplo',
            description: 'Documentação da API de exemplo utilizando Fastify',
            version: '1.0.0',
        },
        servers: [
            { url: 'http://localhost:3333', description: "local server"}
        ],
        tags: [{ name: 'sum', description: 'Sum endpoint'}]
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
});

app.register(sumRoute);

app
  .listen({ port: 3333 })
  .then(() => console.log('Server running on http://localhost:3333'));