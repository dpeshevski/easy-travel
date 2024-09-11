import { ObjectType, Field, ID } from 'type-graphql';
import { ProductCategory, ProductStatus } from '@prisma/client';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => ProductCategory)
  category: ProductCategory;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  location: string;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    category: ProductCategory,
    startDate: Date,
    endDate: Date,
    location: string,
    status: ProductStatus,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.status = status;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  isActive(date: Date = new Date()): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  updateDetails(details: Partial<Product>): void {
    if (details.name) this.name = details.name;
    if (details.description) this.description = details.description;
    if (details.price) this.price = details.price;
    if (details.startDate) this.startDate = details.startDate;
    if (details.endDate) this.endDate = details.endDate;
    if (details.location) this.location = details.location;
    this.updatedAt = new Date();
  }
}
