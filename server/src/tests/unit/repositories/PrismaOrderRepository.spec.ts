import 'reflect-metadata';
import { PrismaOrderRepository } from '../../../infrastructure/repositories/PrismaOrderRepository';
import { prisma } from '../../../infrastructure/config/db';
import { OrderStatus } from '@prisma/client';
import { Order } from '../../../domain/entities/Order';
import { Product } from '../../../domain/entities/Product';

describe('PrismaOrderRepository', () => {
  let orderRepository: PrismaOrderRepository;

  beforeEach(() => {
    orderRepository = new PrismaOrderRepository();
    jest.clearAllMocks();
  });

  it('should return all orders', async () => {
    const mockedOrders = [
      {
        id: '1',
        productId: 'prod1',
        customerName: 'John Doe',
        quantity: 2,
        totalPrice: 200,
        status: OrderStatus.PLACED,
        createdAt: new Date(),
        updatedAt: new Date(),
        product: {
          id: 'prod1',
          name: 'Test Product',
          description: 'A test product',
          price: 100,
        } as Product,
      },
      {
        id: '2',
        productId: 'prod2',
        customerName: 'Jane Doe',
        quantity: 1,
        totalPrice: 150,
        status: OrderStatus.PLACED,
        createdAt: new Date(),
        updatedAt: new Date(),
        product: {
          id: 'prod2',
          name: 'Another Product',
          description: 'Another test product',
          price: 150,
        } as Product,
      },
    ];

    jest.spyOn(prisma.order, 'findMany').mockResolvedValue(mockedOrders as any);

    const orders = await orderRepository.findAll();
    expect(orders.length).toBe(2);
    expect(orders[0].customerName).toBe('John Doe');
    expect(orders[1].customerName).toBe('Jane Doe');
  });

  it('should return an order by id', async () => {
    const mockedOrder = {
      id: '1',
      productId: 'prod1',
      customerName: 'John Doe',
      quantity: 2,
      totalPrice: 200,
      status: OrderStatus.PLACED,
      createdAt: new Date(),
      updatedAt: new Date(),
      product: {
        id: 'prod1',
        name: 'Test Product',
        description: 'A test product',
        price: 100,
      } as Product,
    };

    jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(mockedOrder as any);

    const order = await orderRepository.findById('1');
    expect(order?.customerName).toBe('John Doe');
    expect(prisma.order.findUnique).toHaveBeenCalledWith({ where: { id: '1' }, include: { product: true } });
  });

  it('should return null if order is not found', async () => {
    jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(null);

    const order = await orderRepository.findById('nonexistent-id');
    expect(order).toBeNull();
  });

  it('should create an order', async () => {
    const order = new Order(
      '1',
      'prod1',
      'John Doe',
      2,
      200,
      OrderStatus.PLACED,
      new Date(),
      new Date()
    );

    const createdOrder = {
      id: '1',
      productId: 'prod1',
      customerName: 'John Doe',
      quantity: 2,
      totalPrice: 200,
      status: OrderStatus.PLACED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.order, 'create').mockResolvedValue(createdOrder as any);

    const result = await orderRepository.create(order);
    expect(result.customerName).toBe('John Doe');
    expect(prisma.order.create).toHaveBeenCalledWith({
      data: {
        productId: order.productId,
        customerName: order.customerName,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  });

  it('should update an order', async () => {
    const updatedOrder = new Order(
      '1',
      'prod1',
      'John Doe',
      2,
      200,
      OrderStatus.PLACED,
      new Date(),
      new Date()
    );

    const mockedUpdatedOrder = {
      id: '1',
      productId: 'prod1',
      customerName: 'John Doe',
      quantity: 2,
      totalPrice: 200,
      status: OrderStatus.PLACED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.order, 'update').mockResolvedValue(mockedUpdatedOrder as any);

    const result = await orderRepository.update(updatedOrder);
    expect(result.customerName).toBe('John Doe');
    expect(prisma.order.update).toHaveBeenCalledWith({
      where: { id: updatedOrder.id },
      data: {
        productId: updatedOrder.productId,
        customerName: updatedOrder.customerName,
        quantity: updatedOrder.quantity,
        totalPrice: updatedOrder.totalPrice,
        status: updatedOrder.status,
        updatedAt: updatedOrder.updatedAt,
      },
    });
  });

  it('should delete an order by id', async () => {
    const deletedOrder = {
      id: '1',
      productId: 'prod1',
      customerName: 'John Doe',
      quantity: 2,
      totalPrice: 200,
      status: OrderStatus.PLACED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.order, 'delete').mockResolvedValue(deletedOrder as any);

    await orderRepository.delete('1');
    expect(prisma.order.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should find orders by customer and product', async () => {
    const mockedOrders = [
      {
        id: '1',
        productId: 'prod1',
        customerName: 'John Doe',
        quantity: 2,
        totalPrice: 200,
        status: OrderStatus.PLACED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(prisma.order, 'findMany').mockResolvedValue(mockedOrders as any);

    const orders = await orderRepository.findOrdersByCustomerAndProduct('John Doe', 'prod1');
    expect(orders.length).toBe(1);
    expect(orders[0].customerName).toBe('John Doe');
    expect(prisma.order.findMany).toHaveBeenCalledWith({
      where: {
        customerName: 'John Doe',
        productId: 'prod1',
        createdAt: undefined,
      },
    });
  });
});
