import { z } from 'zod';

const envSchema = z.object({
    PORT: z
        .string()
        .transform(Number)
        .refine(value => value > 0 && value < 65536, {
            message: 'The PORT must be a valid port number between 1 and 65535'
        })
        .default('8080'),
    NODE_ENV: z.enum(["development", "production", "test"]).default('development')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error(
        "Validation error in environment variables:",
        _env.error.format()
    );
    process.exit(1);
}

export const env = _env.data;
