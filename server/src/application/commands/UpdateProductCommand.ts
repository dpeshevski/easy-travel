import { injectable, inject } from 'inversify';
import { UpdateStrategyFactory } from '../../domain/factories/UpdateStrategyFactory';
import { Product } from '../../domain/entities/Product';
import { TYPES } from '../../infrastructure/config/types';
import { ProductDTO } from '../dto/ProductDTO';

@injectable()
export class UpdateProductCommand {
  constructor(
    @inject(TYPES.UpdateStrategyFactory) private strategyFactory: UpdateStrategyFactory
  ) {}

  async execute(id: string, productDTO?: ProductDTO): Promise<Product> {
    const strategy = this.strategyFactory.getStrategy(productDTO);
    return strategy.execute(id, productDTO);
  }
}
