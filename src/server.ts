import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes";

const PORT = Number(process.env.PORT) || 3333;

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

    app.register(cors, {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/v1/docs'
    });

    app.register(registerRoutes, { prefix: '/v1' });

    return app;
}

export async function startServer() {
    const app = createServer();
    const address = await app.listen({ port: PORT });
    console.log(`Server running on ${address}`);
    return app;
}
