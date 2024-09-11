import { registerEnumType } from 'type-graphql';
import { ProductCategory } from '@prisma/client';

registerEnumType(ProductCategory, {
  name: 'ProductCategory',
  description: 'Categories for products like flight, hotel, car rental, and bundle.',
});
