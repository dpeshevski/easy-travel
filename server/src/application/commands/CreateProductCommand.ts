import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { ProductDTO } from '../dto/ProductDTO';
import { ProductService } from '../services/ProductService';

@injectable()
export class CreateProductCommand {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {}

  async execute(productDTO: ProductDTO) {
    return this.productService.createProduct(productDTO);
  }
}
