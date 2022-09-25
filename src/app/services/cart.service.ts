import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  storage: Storage = window.localStorage;

  constructor() {}

  getCartProduct(): any {
    const getProduct = this.storage.getItem('products');
    return getProduct ? JSON.parse(getProduct) : [];
  }

  clearCart(): void {
    this.storage.clear();
  }
}
