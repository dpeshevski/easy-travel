import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { OrderDomainService, OrderRepository } from '../../domain';
import { Order } from '../../domain/entities/Order';
import { OrderDTO } from '../dto/OrderDTO';
import { OrderStatus } from '@prisma/client';

@injectable()
export class OrderService {
  constructor(
    @inject(TYPES.OrderDomainService) private orderDomainService: OrderDomainService,
    @inject(TYPES.OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async createOrder(orderDTO: OrderDTO): Promise<Order> {
    const newOrder = new Order(
      '',
      orderDTO.productId,
      orderDTO.customerName,
      orderDTO.quantity,
      0,
      orderDTO.status!,
      new Date(),
      new Date()
    );

    newOrder.totalPrice = await this.orderDomainService.calculateTotal(newOrder);
    return this.orderDomainService.placeOrder(newOrder);
  }

  async updateOrder(id: string, orderDTO: OrderDTO): Promise<Order> {
    const order = await this.getOrderById(id);
    if (!order) throw new Error('Order not found');

    if (orderDTO.quantity) {
      order.quantity = orderDTO.quantity;
      order.totalPrice = await this.orderDomainService.calculateTotal(order);
    }

    if (orderDTO.customerName) {
      order.customerName = orderDTO.customerName;
    }

    if (orderDTO.status) {
      order.updateStatus(orderDTO.status);
    }

    return this.orderRepository.update(order);
  }

  async getAllOrders(status?: OrderStatus): Promise<Order[]> {
    return this.orderRepository.findAll(status);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async deleteOrder(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
