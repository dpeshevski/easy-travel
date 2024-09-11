import 'reflect-metadata';
import { DeleteProductCommand } from '../../../application/commands/DeleteProductCommand';
import { ProductService } from '../../../application/services/ProductService';
import { mock, instance, when, verify } from 'ts-mockito';
import { TYPES } from '../../../infrastructure/config/types';
import { Container } from 'inversify';

describe('DeleteProductCommand', () => {
  let deleteProductCommand: DeleteProductCommand;
  let productService: ProductService;

  beforeEach(() => {
    productService = mock<ProductService>();
    const container = new Container();
    container.bind<ProductService>(TYPES.ProductService).toConstantValue(instance(productService));
    deleteProductCommand = new DeleteProductCommand(instance(productService));
  });

  it('should call ProductService.deleteProduct with the correct ID', async () => {
    const productId = '123';
    when(productService.deleteProduct(productId)).thenResolve();
    await deleteProductCommand.execute(productId);
    verify(productService.deleteProduct(productId)).once();
  });

  it('should throw an error if ProductService.deleteProduct fails', async () => {
    const productId = '123';
    when(productService.deleteProduct(productId)).thenReject(new Error('Product not found'));
    await expect(deleteProductCommand.execute(productId)).rejects.toThrow('Product not found');
    verify(productService.deleteProduct(productId)).once();
  });
});
