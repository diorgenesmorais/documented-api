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

export function createServer() {
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
                { url: 'http://localhost:3333', description: "local server" }
            ],
            tags: [{ name: 'sum', description: 'Sum endpoint' }]
        },
        transform: jsonSchemaTransform
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/docs'
    });

    app.register(sumRoute);

    return app;
}

export async function startServer() {
    const app = createServer();
    const address = await app.listen({ port: 3333 });
    console.log(`Server running on ${address}`);
    return app;
}
