import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { GeneralUpdateStrategy } from '../strategies/GeneralUpdateStrategy';
import { MarkAsUnavailableStrategy } from '../strategies/MarkAsUnavailableStrategy';
import { ProductService } from '../../application/services/ProductService';
import { ProductDTO } from '../../application/dto/ProductDTO';
import { UpdateStrategy } from '../strategies/UpdateStrategy';

@injectable()
export class UpdateStrategyFactory {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {}

  getStrategy(productDTO?: ProductDTO): UpdateStrategy {
    if (productDTO) {
      return new GeneralUpdateStrategy(this.productService);
    } else {
      return new MarkAsUnavailableStrategy(this.productService);
    }
  }
}
