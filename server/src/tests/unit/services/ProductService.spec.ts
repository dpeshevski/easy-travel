import 'reflect-metadata';
import { ProductService } from '../../../application/services/ProductService';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { Product } from '../../../domain/entities/Product';
import { ProductStatus, ProductCategory } from '@prisma/client';
import { mock, instance, when, verify, anything } from 'ts-mockito';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = mock<ProductRepository>();
    productService = new ProductService(instance(productRepository));
  });

  it('should return product by id', async () => {
    const product = new Product(
      '1', 
      'Test Product', 
      'Description', 
      100, 
      ProductCategory.FLIGHT, 
      new Date(), 
      new Date(), 
      'Location', 
      ProductStatus.AVAILABLE,
      new Date(),
      new Date()
    );

    when(productRepository.findById('1')).thenResolve(product);

    const result = await productService.getProductById('1');
    expect(result).toEqual(product);
    verify(productRepository.findById('1')).once();
  });

  it('should create a new product', async () => {
    const productDTO = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: ProductCategory.FLIGHT,
      startDate: new Date(),
      endDate: new Date(),
      location: 'Location',
      status: ProductStatus.AVAILABLE
    };

    const newProduct = new Product(
      '1', 
      productDTO.name, 
      productDTO.description, 
      productDTO.price, 
      productDTO.category, 
      productDTO.startDate, 
      productDTO.endDate, 
      productDTO.location, 
      productDTO.status,
      new Date(),
      new Date()
    );

    when(productRepository.create(anything())).thenResolve(newProduct);

    const result = await productService.createProduct(productDTO);
    expect(result).toEqual(newProduct);
    verify(productRepository.create(anything())).once();
  });

  it('should throw an error when updating a product that does not exist', async () => {
    const productDTO = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      category: ProductCategory.FLIGHT,
      startDate: new Date(),
      endDate: new Date(),
      location: 'Updated Location',
      status: ProductStatus.AVAILABLE
    };

    when(productRepository.findById('1')).thenResolve(null);

    await expect(productService.updateProduct('1', productDTO)).rejects.toThrow('Product not found');
    verify(productRepository.findById('1')).once();
  });

  it('should delete a product by id', async () => {
    when(productRepository.delete('1')).thenResolve();

    await productService.deleteProduct('1');
    verify(productRepository.delete('1')).once();
  });
});
