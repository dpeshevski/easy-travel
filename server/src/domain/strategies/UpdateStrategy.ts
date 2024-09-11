import { ProductDTO } from "../../application/dto/ProductDTO";
import { Product } from "../entities/Product";

export interface UpdateStrategy {
  execute(id: string, productDTO?: ProductDTO): Promise<Product>;
}