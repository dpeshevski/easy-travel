import { inject, injectable } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { Order } from '../entities/Order';
import { OrderRepository,  } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { OrderStatus } from '@prisma/client';

@injectable()
export class OrderDomainService {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: OrderRepository,
    @inject(TYPES.ProductRepository) private productRepository: ProductRepository,
  ) {}

  async validateOrder(order: Order): Promise<void> {
    this.validateCustomerInformation(order);
    await this.validateProductAvailability(order);
    await this.validateOrderQuantity(order);
    this.validateOrderDate(order);
  }

  async calculateTotal(order: Order): Promise<number> {
    const product = await this.productRepository.findById(order.productId);

    if (!product) {
      throw new Error('Product not found.');
    }

    return product.price * order.quantity;
  }

  async placeOrder(order: Order): Promise<Order> {
    await this.validateOrder(order);
    order.totalPrice = await this.calculateTotal(order);
    order.status = OrderStatus.PLACED;
    return this.orderRepository.create(order);
  }

  validateCustomerInformation(order: Order): void {
    if (!order.customerName || order.customerName.trim().length === 0) {
      throw new Error('Customer name is required.');
    }

    if (!/^[a-zA-Z\s]+$/.test(order.customerName)) {
      throw new Error('Customer name contains invalid characters.');
    }
  }

  async validateProductAvailability(order: Order): Promise<void> {
    const product = await this.productRepository.findById(order.productId);
    if (!product) {
      throw new Error('Product does not exist.');
    }

    if (new Date() > product.endDate) {
      throw new Error('Product is no longer available.');
    }
  }

  async validateOrderQuantity(order: Order): Promise<void> {
    if (order.quantity < 1) {
      throw new Error('Order quantity must be at least 1.');
    }

    if (order.quantity > 15) {
      throw new Error('Order quantity exceeds the maximum allowed limit.');
    }
  }

  validateOrderDate(order: Order): void {
    const currentDate = new Date();

    if (currentDate < order.createdAt) {
      throw new Error('Order date cannot be in the future.');
    }
  }
}
