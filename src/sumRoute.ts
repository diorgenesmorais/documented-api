import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

const sumSchema = z.object({
    a: z.coerce.number(),
    b: z.coerce.number(),
});

export const sumRoute: FastifyPluginAsyncZod = async app => {
    app.get('/sum', {
        schema: {
            querystring: sumSchema,
            tags: ['sum'],
            response: {
                200: z.object({
                    result: z.number(),
                }),
            }
        }
    }, async (request, reply) => {
        const { a, b } = request.query
        const result = a + b;
        return reply.code(200).send({ result });
    })
}