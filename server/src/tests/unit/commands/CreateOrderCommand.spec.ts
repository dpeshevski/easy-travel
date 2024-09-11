import 'reflect-metadata';
import { CreateOrderCommand } from '../../../application/commands/CreateOrderCommand';
import { OrderService } from '../../../application/services/OrderService';
import { OrderDTO } from '../../../application/dto/OrderDTO';
import { OrderStatus } from '@prisma/client';
import { Order } from '../../../domain/entities/Order';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { TYPES } from '../../../infrastructure/config/types';
import { Container } from 'inversify';

describe('CreateOrderCommand', () => {
  let createOrderCommand: CreateOrderCommand;
  let orderService: OrderService;

  beforeEach(() => {
    orderService = mock<OrderService>();
    const container = new Container();
    container.bind<OrderService>(TYPES.OrderService).toConstantValue(instance(orderService));

    createOrderCommand = new CreateOrderCommand(instance(orderService));
  });

  it('should call OrderService.createOrder with correct OrderDTO', async () => {
    const orderDTO: OrderDTO = {
      productId: '123',
      quantity: 2,
      customerName: 'John Doe',
      status: OrderStatus.PLACED,
    };

    const createdOrder: Order = {
      id: 'order-1',
      productId: orderDTO.productId,
      quantity: orderDTO.quantity,
      customerName: orderDTO.customerName,
      status: OrderStatus.PLACED,
      totalPrice: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
      validateOrder: jest.fn(),
      updateCustomerName: jest.fn(),
      updateStatus: jest.fn(),
    };

    when(orderService.createOrder(anything())).thenResolve(createdOrder);
    const result = await createOrderCommand.execute(orderDTO);
    expect(result).toEqual(createdOrder);
    verify(orderService.createOrder(orderDTO)).once();
  });

  it('should throw an error if OrderService.createOrder fails', async () => {
    const orderDTO: OrderDTO = {
      productId: '123',
      quantity: 2,
      customerName: 'John Doe',
      status: OrderStatus.PLACED,
    };

    when(orderService.createOrder(anything())).thenReject(new Error('Service error'));
    await expect(createOrderCommand.execute(orderDTO)).rejects.toThrow('Service error');
    verify(orderService.createOrder(orderDTO)).once();
  });
});
