import { startServer } from './server';

export function main(requireMain = require.main) {
    if (requireMain === module) {
        startServer().catch(err => {
            console.error('Error starting server:', err);
            process.exit(1);
        });
    }
}

main();
