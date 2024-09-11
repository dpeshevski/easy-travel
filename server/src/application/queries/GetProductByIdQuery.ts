import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { ProductService } from '../services/ProductService';
import { Product } from '../../domain/entities/Product';

@injectable()
export class GetProductByIdQuery {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {}

  async execute(id: string): Promise<Product | null> {
    return this.productService.getProductById(id);
  }
}
