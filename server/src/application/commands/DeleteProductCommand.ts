import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { ProductService } from '../services/ProductService';

@injectable()
export class DeleteProductCommand {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {}

  async execute(id: string) {
    return this.productService.deleteProduct(id);
  }
}
