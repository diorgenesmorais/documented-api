import request from 'supertest';
import { createServer, startServer } from '../src/server';
import { FastifyInstance } from 'fastify';

describe('API Endpoints', () => {
    let app: FastifyInstance;

    beforeAll(async () => {
        app = createServer();
        await app.listen({ port: 0 });
    });

    afterAll(async () => {
        await app.close();
    });

    test('should return the sum of two numbers', async () => {
        const response = await request(app.server).get('/sum').query({ a: 5, b: 3 });
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(8);
    });

    test('should return 400 for invalid query parameters', async () => {
        const response = await request(app.server).get('/sum').query({ a: 'invalid', b: 3 });
        expect(response.status).toBe(400);
    });

    test('should serve Swagger UI at /docs', async () => {
        const response = await request(app.server).get('/docs');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Swagger UI');
    });
});

describe('Server Initialization', () => {
    let app: FastifyInstance;

    afterAll(async () => {
        if (app) {
            await app.close();
        }
    });

    test('should start the server and log the running address', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        app = await startServer();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Server running on http://127.0.0.1:3333'));
        consoleSpy.mockRestore();
    });
});