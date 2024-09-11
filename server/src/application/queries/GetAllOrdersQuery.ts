import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { OrderService } from '../services/OrderService';
import { Order } from '../../domain/entities/Order';
import { OrderStatus } from '@prisma/client';

@injectable()
export class GetAllOrdersQuery {
  constructor(@inject(TYPES.OrderService) private orderService: OrderService) {}

  async execute(status?: OrderStatus): Promise<Order[]> {
    return this.orderService.getAllOrders(status);
  }
}
