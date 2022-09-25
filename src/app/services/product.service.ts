import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];
  storage: Storage = window.localStorage;

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('../assets/data.json');
  }

  addProduct(product: Product[]): void {
    this.storage.setItem('products', JSON.stringify(product));
  }
}
