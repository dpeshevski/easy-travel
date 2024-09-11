import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { Order } from '../../domain/entities/Order';
import { prisma } from '../config/db';
import { injectable } from 'inversify';
import { OrderStatus } from '@prisma/client';
import { Product } from '../../domain/entities/Product';

@injectable()
export class PrismaOrderRepository implements OrderRepository {
  async findAll(status?: OrderStatus): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: {
        ...(status ? { status } : {}),
      },
      include: { product: true },
    });

    return orders.map(order => new Order(
      order.id,
      order.productId,
      order.customerName,
      order.quantity,
      order.totalPrice,
      order.status,
      order.createdAt,
      order.updatedAt,
      order.product as Product,
    ));
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!order) return null;
    return new Order(
      order.id,
      order.productId,
      order.customerName,
      order.quantity,
      order.totalPrice,
      order.status,
      order.createdAt,
      order.updatedAt
    );
  }

  async create(order: Order): Promise<Order> {
    const createdOrder = await prisma.order.create({
      data: {
        productId: order.productId,
        customerName: order.customerName,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt,
      },
    });

    return new Order(
      createdOrder.id,
      createdOrder.productId,
      createdOrder.customerName,
      createdOrder.quantity,
      createdOrder.totalPrice,
      createdOrder.status,
      createdOrder.createdAt,
      createdOrder.updatedAt
    );
  }

  async update(order: Order): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        productId: order.productId,
        customerName: order.customerName,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        updatedAt: order.updatedAt,
      },
    });

    return new Order(
      updatedOrder.id,
      updatedOrder.productId,
      updatedOrder.customerName,
      updatedOrder.quantity,
      updatedOrder.totalPrice,
      updatedOrder.status,
      updatedOrder.createdAt,
      updatedOrder.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({ where: { id } });
  }

  async findOrdersByCustomerAndProduct(customerName: string, productId: string, options?: { withinHours?: number }): Promise<Order[]> {
    const { withinHours } = options || {};
    const timeLimit = withinHours ? new Date(Date.now() - withinHours * 60 * 60 * 1000) : undefined;

    const orders = await prisma.order.findMany({
      where: {
        customerName,
        productId,
        createdAt: timeLimit ? { gte: timeLimit } : undefined,
      },
    });

    return orders.map(order => new Order(
      order.id,
      order.productId,
      order.customerName,
      order.quantity,
      order.totalPrice,
      order.status,
      order.createdAt,
      order.updatedAt
    ));
  }
}
