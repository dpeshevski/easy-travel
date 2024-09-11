import { prisma } from '../../infrastructure/config/db';

async function seed() {
  await prisma.product.create({
    data: {
      name: "Flight to Berlin",
      description: "One-way flight to Berlin",
      price: 150.00,
      category: "FLIGHT",
      startDate: "2024-09-01T00:00:00Z",
      endDate: "2024-09-02T00:00:00Z",
      location: "Berlin"
    }
  });
  console.log('Database has been seeded!');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
