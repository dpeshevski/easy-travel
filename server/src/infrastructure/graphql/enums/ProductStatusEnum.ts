import { registerEnumType } from 'type-graphql';
import { ProductStatus } from '@prisma/client';

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'The status of the product',
});
