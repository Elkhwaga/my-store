import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any = [];
  storage: Storage = window.localStorage;

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseApi);
  }

  addProduct(product: Product[]): void {
    this.storage.setItem('cart', JSON.stringify(product));
  }

  cartSubject = new Subject<any>();
}
