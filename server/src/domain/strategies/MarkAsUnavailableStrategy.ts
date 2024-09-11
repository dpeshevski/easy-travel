import { UpdateStrategy } from './UpdateStrategy';
import { ProductService } from '../../application/services/ProductService';
import { Product } from "../entities/Product";

export class MarkAsUnavailableStrategy implements UpdateStrategy {
  constructor(private productService: ProductService) {}

  async execute(id: string): Promise<Product> {
    return this.productService.markProductAsUnavailable(id);
  }
}
