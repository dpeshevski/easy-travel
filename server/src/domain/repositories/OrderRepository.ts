import { OrderStatus } from "@prisma/client";
import { Order } from "../entities/Order";

export interface OrderRepository {
  findAll(status?: OrderStatus): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;

  findOrdersByCustomerAndProduct(customerName: string, productId: string, options?: { withinHours?: number }): Promise<Order[]>;
}