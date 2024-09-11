import 'reflect-metadata';
import { GetAllProductsQuery } from '../../../application/queries/GetAllProductsQuery';
import { ProductService } from '../../../application/services/ProductService';
import { ProductStatus } from '@prisma/client';
import { Product } from '../../../domain/entities/Product';
import { mock, instance, when, verify } from 'ts-mockito';
import { TYPES } from '../../../infrastructure/config/types';
import { Container } from 'inversify';

describe('GetAllProductsQuery', () => {
  let getAllProductsQuery: GetAllProductsQuery;
  let productService: ProductService;

  beforeEach(() => {
    productService = mock<ProductService>();
    const container = new Container();
    container.bind<ProductService>(TYPES.ProductService).toConstantValue(instance(productService));
    getAllProductsQuery = new GetAllProductsQuery(instance(productService));
  });

  it('should return all products when no status is provided', async () => {
    const products: Product[] = [
      new Product('1', 'Product 1', 'Description 1', 100, 'FLIGHT', new Date(), new Date(), 'Location 1', ProductStatus.AVAILABLE, new Date(), new Date()),
      new Product('2', 'Product 2', 'Description 2', 200, 'HOTEL', new Date(), new Date(), 'Location 2', ProductStatus.AVAILABLE, new Date(), new Date())
    ];

    when(productService.getAllProducts(undefined)).thenResolve(products);
    const result = await getAllProductsQuery.execute();
    expect(result).toEqual(products);
    verify(productService.getAllProducts(undefined)).once();
  });

  it('should return products with the specified status', async () => {
    const status = ProductStatus.UNAVAILABLE;
    const products: Product[] = [
      new Product('3', 'Product 3', 'Description 3', 150, 'CAR_RENTAL', new Date(), new Date(), 'Location 3', ProductStatus.UNAVAILABLE, new Date(), new Date())
    ];
    when(productService.getAllProducts(status)).thenResolve(products);
    const result = await getAllProductsQuery.execute(status);
    expect(result).toEqual(products);
    verify(productService.getAllProducts(status)).once();
  });

  it('should throw an error if ProductService.getAllProducts fails', async () => {
    const status = ProductStatus.AVAILABLE;
    when(productService.getAllProducts(status)).thenReject(new Error('Service error'));
    await expect(getAllProductsQuery.execute(status)).rejects.toThrow('Service error');
    verify(productService.getAllProducts(status)).once();
  });
});
