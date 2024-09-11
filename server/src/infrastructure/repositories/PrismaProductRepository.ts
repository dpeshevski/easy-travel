import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { prisma } from '../config/db';
import { ProductCategory, ProductStatus } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class PrismaProductRepository implements ProductRepository {
  async findAll(status?: ProductStatus): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        ...(status ? { status } : {}),
      },
    });

    return products.map(product => new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.startDate,
      product.endDate,
      product.location,
      product.status,
      product.createdAt,
      product.updatedAt
    ));
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.startDate,
      product.endDate,
      product.location,
      product.status,
      product.createdAt,
      product.updatedAt
    );
  }

  async findByCategory(category: ProductCategory): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { category },
    });
    return products.map(product => new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.startDate,
      product.endDate,
      product.location,
      product.status,
      product.createdAt,
      product.updatedAt
    ));
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        startDate: product.startDate,
        endDate: product.endDate,
        location: product.location,
        status: product.status,
      },
    });
    return new Product(
      createdProduct.id,
      createdProduct.name,
      createdProduct.description,
      createdProduct.price,
      createdProduct.category,
      createdProduct.startDate,
      createdProduct.endDate,
      createdProduct.location,
      createdProduct.status,
      createdProduct.createdAt,
      createdProduct.updatedAt
    );
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData
    });

    return new Product(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.category,
      updatedProduct.startDate,
      updatedProduct.endDate,
      updatedProduct.location,
      updatedProduct.status,
      updatedProduct.createdAt,
      updatedProduct.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  async markProductAsUnavailable(productId: string): Promise<Product> {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { status: ProductStatus.UNAVAILABLE, deletedAt: new Date()}
    });

    return new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.startDate,
      product.endDate,
      product.location,
      product.status,
      product.createdAt,
      product.updatedAt
    );
  };  
}
