import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { ProductService } from '../services/ProductService';
import { Product } from '../../domain/entities/Product';
import { ProductStatus } from '@prisma/client';

@injectable()
export class GetAllProductsQuery {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {}

  async execute(status?: ProductStatus): Promise<Product[]> {
    return this.productService.getAllProducts(status);
  }
}
