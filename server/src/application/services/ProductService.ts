import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/config/types';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductCategory, ProductStatus } from '@prisma/client';
import { ProductDTO } from '../dto/ProductDTO';

@injectable()
export class ProductService {
  constructor(
    @inject(TYPES.ProductRepository) private productRepository: ProductRepository
  ) {}

  async getAllProducts(status?: ProductStatus): Promise<Product[]> {
    return this.productRepository.findAll(status);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.productRepository.findByCategory(category);
  }

  async createProduct(productDTO: ProductDTO): Promise<Product> {
    const newProduct = new Product(
      '',
      productDTO.name,
      productDTO.description,
      productDTO.price,
      productDTO.category,
      productDTO.startDate,
      productDTO.endDate,
      productDTO.location,
      productDTO.status
    );

    return this.productRepository.create(newProduct);
  }

  async updateProduct(id: string, productDTO: ProductDTO): Promise<Product> {
    const product = await this.getProductById(id);
    if (!product) throw new Error('Product not found');

    // product.updateDetails(productDTO);
    // return this.productRepository.update(product);

    const updateData: Partial<Product> = {
      name: productDTO.name,
      description: productDTO.description,
      price: productDTO.price,
      category: productDTO.category,
      startDate: productDTO.startDate,
      endDate: productDTO.endDate,
      location: productDTO.location
    };

    return this.productRepository.update(id, updateData);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productRepository.delete(id);
  }

  async markProductAsUnavailable(id: string): Promise<Product> {
    return this.productRepository.markProductAsUnavailable(id);
  }
}
