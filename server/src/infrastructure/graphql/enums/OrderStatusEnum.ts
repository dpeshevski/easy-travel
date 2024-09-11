import { registerEnumType } from 'type-graphql';
import { OrderStatus } from '@prisma/client';

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Status for orders like pending, placed, shipped, cancelled, and completed.',
});
