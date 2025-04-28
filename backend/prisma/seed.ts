import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { id: '1', label: 'Electronics' },
      { id: '2', label: 'Clothing and Accessories' },
      { id: '3', label: 'Food and Beverages' },
      { id: '4', label: 'Furniture and Home Decor' },
      { id: '5', label: 'Health and Beauty' },
      { id: '6', label: 'Toys and Games' },
      { id: '7', label: 'Sports and Outdoors' },
      { id: '8', label: 'Automotive' },
      { id: '9', label: 'Books and Stationery' },
      { id: '10', label: 'Technology and Gadgets' },
    ],
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
