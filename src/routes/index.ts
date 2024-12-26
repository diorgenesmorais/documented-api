
import { sumRoute } from "./sumRoute";
import { FastifyInstance } from "fastify";

export async function registerRoutes(app: FastifyInstance) {
    app.register(sumRoute, { prefix: '/sum' });
}