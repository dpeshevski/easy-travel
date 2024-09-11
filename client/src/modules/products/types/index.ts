/* eslint-disable no-shadow */
export enum Category {
  FLIGHT = 'FLIGHT',
  HOTEL = 'HOTEL',
  CAR_RENTAL = 'CAR_RENTAL',
  BUNDLE = 'BUNDLE',
}

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  startDate: Date;
  endDate: Date;
  location: string;
  status?: ProductStatus;
}

export interface ProductState {
  products: Product[],
  categories: Category[],
}

export type ProductsQueryResult = {
  products: Product[];
}
