import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Product } from '../../../domain/entities/Product';
import { GetAllProductsQuery } from '../../../application/queries/GetAllProductsQuery';
import { GetProductByIdQuery } from '../../../application/queries/GetProductByIdQuery';
import { GetProductsByCategoryQuery } from '../../../application/queries/GetProductsByCategoryQuery';
import { CreateProductCommand } from '../../../application/commands/CreateProductCommand';
import { UpdateProductCommand } from '../../../application/commands/UpdateProductCommand';
import { DeleteProductCommand } from '../../../application/commands/DeleteProductCommand';
import { ProductDTO } from '../../../application/dto/ProductDTO';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../infrastructure/config/types';
import { ProductCategory, ProductStatus } from '@prisma/client';
import { AuthorizationMiddleware } from '../middlewares/AuthorizationMiddleware';

@injectable()
@Resolver(of => Product)
export class ProductResolver {
  constructor(
    @inject(TYPES.GetAllProductsQuery) private getAllProductsQuery: GetAllProductsQuery,
    @inject(TYPES.GetProductByIdQuery) private getProductByIdQuery: GetProductByIdQuery,
    @inject(TYPES.GetProductsByCategoryQuery) private getProductsByCategoryQuery: GetProductsByCategoryQuery,
    @inject(TYPES.CreateProductCommand) private createProductCommand: CreateProductCommand,
    @inject(TYPES.UpdateProductCommand) private updateProductCommand: UpdateProductCommand,
    @inject(TYPES.DeleteProductCommand) private deleteProductCommand: DeleteProductCommand
  ) {}

  @Query(returns => [Product])
  async products(@Arg("status", { nullable: true }) status?: ProductStatus): Promise<Product[]> {
    return this.getAllProductsQuery.execute(status);
  }

  @Query(returns => Product, { nullable: true })
  async product(@Arg("id") id: string): Promise<Product | null> {
    return this.getProductByIdQuery.execute(id);
  }

  @Query(returns => [Product])
  async productsByCategory(@Arg("category") category: ProductCategory): Promise<Product[]> {
    return this.getProductsByCategoryQuery.execute(category);
  }

  @Query(returns => [Product])
  async bundles(): Promise<Product[]> {
    return this.getProductsByCategoryQuery.execute(ProductCategory.BUNDLE);
  }

  @Mutation(returns => Product)
  @UseMiddleware(AuthorizationMiddleware)
  async createProduct(@Arg('data') productDTO: ProductDTO): Promise<Product> {
    return this.createProductCommand.execute(productDTO);
  }

  @Mutation(returns => Product)
  @UseMiddleware(AuthorizationMiddleware)
  async createBundle(
    @Arg('data') productDTO: ProductDTO,
    @Arg('flightId') flightId: string,
    @Arg('hotelId', { nullable: true }) hotelId?: string,
    @Arg('carRentalId', { nullable: true }) carRentalId?: string
  ): Promise<Product> {
    const flight = await this.getProductByIdQuery.execute(flightId);
    const hotel = hotelId ? await this.getProductByIdQuery.execute(hotelId) : null;
    const carRental = carRentalId ? await this.getProductByIdQuery.execute(carRentalId) : null;

    if (!flight) {
      throw new Error('Flight product not found');
    }

    const bundle = {
      ...productDTO,
      category: ProductCategory.BUNDLE,
      price: flight.price + (hotel?.price || 0) + (carRental?.price || 0),
    };

    return this.createProductCommand.execute(bundle);
  }

  @Mutation(returns => Product)
  @UseMiddleware(AuthorizationMiddleware)
  async updateProduct(@Arg("id") id: string, @Arg("data", { nullable: true }) productDTO?: ProductDTO): Promise<Product> {
    return this.updateProductCommand.execute(id, productDTO);
  }

  @Mutation(returns => Boolean)
  @UseMiddleware(AuthorizationMiddleware)
  async deleteProduct(@Arg("id") id: string): Promise<boolean> {
    await this.deleteProductCommand.execute(id);
    return true;
  }
}
