import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Example: Create a new product
async function createProduct() {
  const product = await prisma.product.create({
    data: {
      name: "Flight to Mallorca",
      description: "Round trip flight from Dusseldorf to Mallorca",
      price: 300.00,
      category: "FLIGHT",
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-09-10'),
      location: "Mallorca",
      status: "AVAILABLE"
    },
  });

  console.log(product);
}

createProduct().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
