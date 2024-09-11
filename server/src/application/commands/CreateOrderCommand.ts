
import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { OrderDTO } from '../dto/OrderDTO';
import { OrderService } from '../services/OrderService';

@injectable()
export class CreateOrderCommand {
  constructor(@inject(TYPES.OrderService) private orderService: OrderService) {}

  async execute(orderDTO: OrderDTO) {
    return this.orderService.createOrder(orderDTO);
  }
}
