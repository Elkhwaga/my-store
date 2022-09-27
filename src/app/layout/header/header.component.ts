import { Component, OnInit } from '@angular/core';

import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import {
  faShop,
  faCartShopping,
  faTag,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faShop: IconDefinition = faShop;
  faCartShopping: IconDefinition = faCartShopping;
  faTag: IconDefinition = faTag;
  shoppingBag: number = 0;
  cartProductList!: Product[];
  title: string = 'My Store';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.productService.cartSubject.subscribe(
      (res) => {
        this.shoppingBag = res;
      },
      (error) => {
        console.log(error.massage);
      }
    );
  }

  ngOnInit(): void {
    this.getShoppingBag();
  }

  getShoppingBag(): void {
    if ('cart' in localStorage) {
      let shoppingBagCount = this.cartService.getCartProduct();
      this.shoppingBag = shoppingBagCount.length;
    }
  }
}
