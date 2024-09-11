import { prisma } from './infrastructure/config/db';

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing database connection...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Closing database connection...');
  await prisma.$disconnect();
  process.exit(0);
});
