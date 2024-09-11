import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { OrderService } from '../services/OrderService';
import { Order } from '../../domain/entities/Order';

@injectable()
export class GetOrderByIdQuery {
  constructor(@inject(TYPES.OrderService) private orderService: OrderService) {}

  async execute(id: string): Promise<Order | null> {
    return this.orderService.getOrderById(id);
  }
}