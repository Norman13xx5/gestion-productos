export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: string;
  available: boolean;
}
