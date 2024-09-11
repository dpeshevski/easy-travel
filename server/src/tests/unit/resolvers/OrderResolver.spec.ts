import 'reflect-metadata';
import { OrderResolver } from '../../../infrastructure/graphql/resolvers/OrderResolver';
import { CreateOrderCommand } from '../../../application/commands/CreateOrderCommand';
import { UpdateOrderCommand } from '../../../application/commands/UpdateOrderCommand';
import { GetAllOrdersQuery } from '../../../application/queries/GetAllOrdersQuery';
import { GetOrderByIdQuery } from '../../../application/queries/GetOrderByIdQuery';
import { OrderDTO } from '../../../application/dto/OrderDTO';
import { OrderStatus } from '@prisma/client';
import { Order } from '../../../domain/entities/Order';
import { mock, instance, when, anything } from 'ts-mockito';

describe('OrderResolver', () => {
  let createOrderCommand: CreateOrderCommand;
  let updateOrderCommand: UpdateOrderCommand;
  let getAllOrdersQuery: GetAllOrdersQuery;
  let getOrderByIdQuery: GetOrderByIdQuery;
  let orderResolver: OrderResolver;

  beforeEach(() => {
    createOrderCommand = mock(CreateOrderCommand);
    updateOrderCommand = mock(UpdateOrderCommand);
    getAllOrdersQuery = mock(GetAllOrdersQuery);
    getOrderByIdQuery = mock(GetOrderByIdQuery);

    orderResolver = new OrderResolver(
      instance(createOrderCommand),
      instance(updateOrderCommand),
      instance(getAllOrdersQuery),
      instance(getOrderByIdQuery)
    );
  });

  it('should confirm an order', async () => {
    // Arrange
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

    order.validateOrder = jest.fn();
    order.updateCustomerName = jest.fn();
    order.updateStatus = jest.fn();

    when(getOrderByIdQuery.execute('1')).thenResolve(order);
    when(updateOrderCommand.execute('1', anything())).thenResolve({
      ...order,
      status: OrderStatus.COMPLETED
    } as Order);

    const result = await orderResolver.confirmOrder('1');
    expect(result.status).toBe(OrderStatus.COMPLETED);
  });

  it('should throw an error if order is not found for confirmation', async () => {
    when(getOrderByIdQuery.execute('1')).thenResolve(null);
    await expect(orderResolver.confirmOrder('1')).rejects.toThrow('Order not found');
  });

  it('should process an order', async () => {
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

    order.validateOrder = jest.fn();
    order.updateCustomerName = jest.fn();
    order.updateStatus = jest.fn();

    when(getOrderByIdQuery.execute('1')).thenResolve(order);
    when(updateOrderCommand.execute('1', anything())).thenResolve({
      ...order,
      status: OrderStatus.PROCESSING
    } as Order);

    const result = await orderResolver.processOrder('1');
    expect(result.status).toBe(OrderStatus.PROCESSING);
  });

  it('should create an order', async () => {
    const orderDTO: OrderDTO = {
      productId: 'prod1',
      customerName: 'John Doe',
      quantity: 2,
      status: OrderStatus.PLACED
    };
  
    const createdOrder = new Order(
      '1',
      orderDTO.productId,
      orderDTO.customerName,
      orderDTO.quantity,
      200,
      orderDTO.status || OrderStatus.PLACED,
      new Date(),
      new Date()
    );
  
    when(createOrderCommand.execute(orderDTO)).thenResolve(createdOrder);
    const result = await orderResolver.createOrder(orderDTO);
    expect(result).toEqual(createdOrder);
  });

  it('should return all orders', async () => {
    const orders = [
      new Order('1', 'prod1', 'John Doe', 2, 200, OrderStatus.PLACED, new Date(), new Date()),
      new Order('2', 'prod2', 'Jane Doe', 1, 150, OrderStatus.COMPLETED, new Date(), new Date())
    ];

    when(getAllOrdersQuery.execute(undefined)).thenResolve(orders);
    const result = await orderResolver.orders();
    expect(result).toEqual(orders);
  });

  it('should return an order by id', async () => {
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

    when(getOrderByIdQuery.execute('1')).thenResolve(order);
    const result = await orderResolver.order('1');
    expect(result).toEqual(order);
  });
});
