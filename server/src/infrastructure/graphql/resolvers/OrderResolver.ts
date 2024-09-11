  import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
  import { Order } from '../../../domain/entities/Order';
  import { CreateOrderCommand } from '../../../application/commands/CreateOrderCommand';
  import { UpdateOrderCommand } from '../../../application/commands/UpdateOrderCommand';
  import { GetAllOrdersQuery } from '../../../application/queries/GetAllOrdersQuery';
  import { GetOrderByIdQuery } from '../../../application/queries/GetOrderByIdQuery';
  import { OrderDTO } from '../../../application/dto/OrderDTO';
  import { inject, injectable } from 'inversify';
  import { TYPES } from '../../../infrastructure/config/types';
  import { OrderStatus } from '@prisma/client';

  @Resolver(of => Order)
  @injectable()
  export class OrderResolver {
    constructor(
      @inject(TYPES.CreateOrderCommand) private createOrderCommand: CreateOrderCommand,
      @inject(TYPES.UpdateOrderCommand) private updateOrderCommand: UpdateOrderCommand,
      @inject(TYPES.GetAllOrdersQuery) private getAllOrdersQuery: GetAllOrdersQuery,
      @inject(TYPES.GetOrderByIdQuery) private getOrderByIdQuery: GetOrderByIdQuery
    ) {}

    @Query(returns => [Order])
    async orders(@Arg("status", { nullable: true }) status?: OrderStatus): Promise<Order[]> {
      return this.getAllOrdersQuery.execute(status);
    }

    @Query(returns => Order, { nullable: true })
    async order(@Arg("id") id: string): Promise<Order | null> {
      return this.getOrderByIdQuery.execute(id);
    }

    @Mutation(returns => Order)
    async createOrder(@Arg("data") orderInput: OrderDTO): Promise<Order> {
      return this.createOrderCommand.execute(orderInput);
    }

    @Mutation(returns => Order)
    async updateOrder(@Arg("id") id: string, @Arg("data") orderInput: OrderDTO): Promise<Order> {
      return this.updateOrderCommand.execute(id, orderInput);
    }

    @Mutation(returns => Order)
    async processOrder(@Arg("id") id: string): Promise<Order> {
      const order = await this.getOrderByIdQuery.execute(id);
      if (!order) throw new Error('Order not found');
      order.status = "PROCESSING";
      return this.updateOrderCommand.execute(id, order);
    }

    @Mutation(returns => Order)
    async confirmOrder(@Arg("id") id: string): Promise<Order> {
      const order = await this.getOrderByIdQuery.execute(id);
      if (!order) throw new Error('Order not found');
      if (order.status !== "PLACED") throw new Error('Order is not in a confirmable state');
      order.status = "COMPLETED";
      return this.updateOrderCommand.execute(id, order);
    }
  }
