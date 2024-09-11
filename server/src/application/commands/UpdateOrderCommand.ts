import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { OrderDTO } from '../dto/OrderDTO';
import { OrderService } from '../services/OrderService';

@injectable()
export class UpdateOrderCommand {
  constructor(@inject(TYPES.OrderService) private orderService: OrderService) {}

  async execute(id: string, orderDTO: OrderDTO) {
    return this.orderService.updateOrder(id, orderDTO);
  }
}
