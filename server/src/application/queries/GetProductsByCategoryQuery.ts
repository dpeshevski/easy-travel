import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { ProductService } from '../services/ProductService';
import { Product } from '../../domain/entities/Product';
import { ProductCategory } from '@prisma/client';

@injectable()
export class GetProductsByCategoryQuery {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {}

  async execute(category: ProductCategory): Promise<Product[]> {
    return this.productService.getProductsByCategory(category);
  }
}
