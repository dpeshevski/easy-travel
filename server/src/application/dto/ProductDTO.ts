import { InputType, Field } from "type-graphql";
import { ProductCategory, ProductStatus } from "@prisma/client";
import '../../infrastructure/graphql/enums/ProductEnums';
import '../../infrastructure/graphql/enums/ProductStatusEnum';

@InputType()
export class ProductDTO {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Number)
  price!: number;

  @Field(() => ProductCategory)
  category!: ProductCategory;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => Date)
  endDate!: Date;

  @Field()
  location!: string;

  @Field(() => ProductStatus)
  status!: ProductStatus;
}
