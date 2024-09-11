import { OrderStatus } from '@prisma/client';
import { InputType, Field } from 'type-graphql';
import '../../infrastructure/graphql/enums/OrderStatusEnum';
import { ProductDTO } from './ProductDTO';

@InputType()
export class OrderDTO {
  @Field()
  productId!: string;

  @Field()
  customerName!: string;

  @Field(() => Number)
  quantity!: number;

  @Field({ nullable: true })
  status?: OrderStatus;

  @Field({ nullable: true })
  product?: ProductDTO;
}
