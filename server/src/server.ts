import "reflect-metadata";
import { startServer } from './infrastructure/config/server';

async function main() {
  try {
    await startServer();
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

main();
