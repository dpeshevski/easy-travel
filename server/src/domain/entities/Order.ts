import { ObjectType, Field, ID } from 'type-graphql';
import { OrderStatus } from '@prisma/client';
import { Product } from './Product';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  productId: string;

  @Field({ nullable: true })
  product?: Product;

  @Field()
  customerName: string;

  @Field()
  quantity: number;

  @Field()
  totalPrice: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

    constructor(
      id: string,
      productId: string,
      customerName: string,
      quantity: number,
      totalPrice: number,
      status: OrderStatus,
      createdAt: Date,
      updatedAt?: Date,
      product?: Product,
    ) {
      this.id = id;
      this.productId = productId;
      this.customerName = customerName;
      this.quantity = quantity;
      this.totalPrice = totalPrice;
      this.status = status;
      this.product = product;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }

  validateOrder(): void {
    if (!this.productId || !this.customerName) {
      throw new Error('Invalid order: Missing productId or customerName');
    }
  }

  updateCustomerName(name: string): void {
    this.customerName = name;
  }

  updateStatus(newStatus: OrderStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}
