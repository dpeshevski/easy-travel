import { UpdateStrategy } from './UpdateStrategy';
import { ProductService } from '../../application/services/ProductService';
import { ProductDTO } from '../../application/dto/ProductDTO';
import { Product } from "../entities/Product";

export class GeneralUpdateStrategy implements UpdateStrategy {
  constructor(private productService: ProductService) {}

  async execute(id: string, productDTO: ProductDTO): Promise<Product> {
    return this.productService.updateProduct(id, productDTO);
  }
}
