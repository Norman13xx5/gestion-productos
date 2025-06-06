import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200, description: 'Portátil de alto rendimiento', category: 'Electrónica', available: true },
    { id: 2, name: 'Mouse', price: 25, description: 'Mouse inalámbrico', category: 'Accesorios', available: true },
    { id: 3, name: 'Teclado', price: 45, description: 'Teclado mecánico', category: 'Accesorios', available: false },
  ];
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  private saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem('products');
    if (data) {
      this.products = JSON.parse(data);
      this.productsSubject.next(this.products);
    }
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  addProduct(product: Product): void {
    product.id = this.getNextId();
    this.products.push(product);
    this.saveToLocalStorage();
    this.productsSubject.next(this.products);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
      this.saveToLocalStorage();
      this.productsSubject.next(this.products);
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToLocalStorage();
    this.productsSubject.next(this.products);
  }

  private getNextId(): number {
    return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  }

  filterProducts(category?: string, available?: boolean): Product[] {
    return this.products.filter(product => {
      const matchCategory = category ? product.category === category : true;
      const matchAvailable = available !== undefined ? product.available === available : true;
      return matchCategory && matchAvailable;
    });
  }
}
