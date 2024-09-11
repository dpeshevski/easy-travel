export interface Product {
  id: string;
  name: string;
}

// eslint-disable-next-line no-shadow
export enum Status {
  PLACED = 'PLACED',
  PROCESSING = 'PROCESSING',
  MANUAL_CONFIRMATION = 'MANUAL_CONFIRMATION',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  product: Product;
  customerName: string;
  quantity: number;
  totalPrice: number;
  status: Status;
}

export interface OrderState {
  customerName: string;
  orders: Order[];
}
