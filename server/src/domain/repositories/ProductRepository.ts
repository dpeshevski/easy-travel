import { ProductCategory, ProductStatus } from "@prisma/client";
import { Product } from "../entities/Product";

export interface ProductRepository {
  findAll(status?: ProductStatus): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategory(category: ProductCategory): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
  markProductAsUnavailable(id: string): Promise<Product>;
}