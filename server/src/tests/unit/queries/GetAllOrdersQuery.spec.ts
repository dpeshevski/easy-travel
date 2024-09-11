import 'reflect-metadata';
import { GetAllOrdersQuery } from '../../../application/queries/GetAllOrdersQuery';
import { OrderService } from '../../../application/services/OrderService';
import { OrderStatus } from '@prisma/client';
import { Order } from '../../../domain/entities/Order';
import { mock, instance, when, verify } from 'ts-mockito';
import { TYPES } from '../../../infrastructure/config/types';
import { Container } from 'inversify';

describe('GetAllOrdersQuery', () => {
  let getAllOrdersQuery: GetAllOrdersQuery;
  let orderService: OrderService;

  beforeEach(() => {
    orderService = mock<OrderService>();
    const container = new Container();
    container.bind<OrderService>(TYPES.OrderService).toConstantValue(instance(orderService));

    getAllOrdersQuery = new GetAllOrdersQuery(instance(orderService));
  });

  it('should return all orders when no status is provided', async () => {
    const orders: Order[] = [
      new Order('1', 'prod-1', 'John Doe', 2, 100, OrderStatus.PLACED, new Date(), new Date()),
      new Order('2', 'prod-2', 'Jane Doe', 1, 200, OrderStatus.PROCESSING, new Date(), new Date()),
    ];

    when(orderService.getAllOrders(undefined)).thenResolve(orders);
    const result = await getAllOrdersQuery.execute();
    expect(result).toEqual(orders);
    verify(orderService.getAllOrders(undefined)).once();
  });

  it('should return orders with the specified status', async () => {
    const status = OrderStatus.PLACED;
    const orders: Order[] = [
      new Order('3', 'prod-3', 'Mike Smith', 1, 150, OrderStatus.PLACED, new Date(), new Date()),
    ];

    when(orderService.getAllOrders(status)).thenResolve(orders);
    const result = await getAllOrdersQuery.execute(status);
    expect(result).toEqual(orders);
    verify(orderService.getAllOrders(status)).once();
  });

  it('should throw an error if OrderService.getAllOrders fails', async () => {
    const status = OrderStatus.PLACED;
    when(orderService.getAllOrders(status)).thenReject(new Error('Service error'));
    await expect(getAllOrdersQuery.execute(status)).rejects.toThrow('Service error');
    verify(orderService.getAllOrders(status)).once();
  });
});
