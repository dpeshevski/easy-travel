import 'reflect-metadata';
import { PrismaProductRepository } from '../../../infrastructure/repositories/PrismaProductRepository';
import { prisma } from '../../../infrastructure/config/db';
import { ProductCategory, ProductStatus } from '@prisma/client';
import { Product } from '../../../domain/entities/Product';

describe('PrismaProductRepository', () => {
  let productRepository: PrismaProductRepository;

  beforeEach(() => {
    productRepository = new PrismaProductRepository();
    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    const mockedProducts = [
      {
        id: '1',
        name: 'Test Product 1',
        description: 'Description 1',
        price: 100,
        category: ProductCategory.FLIGHT,
        startDate: new Date(),
        endDate: new Date(),
        location: 'Location 1',
        status: ProductStatus.AVAILABLE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Test Product 2',
        description: 'Description 2',
        price: 200,
        category: ProductCategory.HOTEL,
        startDate: new Date(),
        endDate: new Date(),
        location: 'Location 2',
        status: ProductStatus.AVAILABLE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockedProducts as any);

    const products = await productRepository.findAll();
    expect(products.length).toBe(2);
    expect(products[0].name).toBe('Test Product 1');
    expect(products[1].name).toBe('Test Product 2');
  });

  it('should return product by id', async () => {
    const mockedProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      price: 100,
      category: ProductCategory.FLIGHT,
      startDate: new Date(),
      endDate: new Date(),
      location: 'Location',
      status: ProductStatus.AVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(mockedProduct as any);

    const product = await productRepository.findById('1');
    expect(product?.name).toBe('Test Product');
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should return null if product is not found by id', async () => {
    jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

    const product = await productRepository.findById('nonexistent-id');
    expect(product).toBeNull();
  });

  it('should create a product', async () => {
    const product = new Product(
      '1',
      'New Product',
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

    const createdProduct = {
      id: '1',
      name: 'New Product',
      description: 'Description',
      price: 100,
      category: ProductCategory.FLIGHT,
      startDate: new Date(),
      endDate: new Date(),
      location: 'Location',
      status: ProductStatus.AVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.product, 'create').mockResolvedValue(createdProduct as any);

    const result = await productRepository.create(product);
    expect(result.name).toBe('New Product');
    expect(prisma.product.create).toHaveBeenCalledWith({
      data: {
        name: 'New Product',
        description: 'Description',
        price: 100,
        category: ProductCategory.FLIGHT,
        startDate: product.startDate,
        endDate: product.endDate,
        location: 'Location',
        status: ProductStatus.AVAILABLE,
      },
    });
  });

  it('should delete a product by id', async () => {
    const deletedProduct = {
      id: '1',
      name: 'Deleted Product',
      description: 'Description of deleted product',
      price: 100,
      category: ProductCategory.FLIGHT,
      startDate: new Date(),
      endDate: new Date(),
      location: 'Location',
      status: ProductStatus.UNAVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
  
    jest.spyOn(prisma.product, 'delete').mockResolvedValue(deletedProduct as any);
  
    await productRepository.delete('1');
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
  

  it('should mark product as unavailable', async () => {
    const product = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      price: 100,
      category: ProductCategory.FLIGHT,
      startDate: new Date(),
      endDate: new Date(),
      location: 'Location',
      status: ProductStatus.UNAVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.product, 'update').mockResolvedValue(product as any);

    const result = await productRepository.markProductAsUnavailable('1');
    expect(result.status).toBe(ProductStatus.UNAVAILABLE);
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { status: ProductStatus.UNAVAILABLE, deletedAt: expect.any(Date) },
    });
  });
});
