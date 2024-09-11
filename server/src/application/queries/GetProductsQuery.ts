import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class GetProductsQuery {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    return this.productRepository.findAll();
  }
}
