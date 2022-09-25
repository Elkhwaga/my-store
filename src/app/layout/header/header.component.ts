import { Component, OnInit } from '@angular/core';

import { Product } from '../../model/product';
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

  cartProductList!: Product[];

  title: string = 'My Store';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartProductList = this.cartService.getCartProduct();
    this.calculate(this.cartProductList);
  }

  calculate(countCart: Product[]): void {
    let counter = 0;
    countCart.forEach((item) => {
      counter += Number(item.amount);
    });
    const cartAmount = document.getElementById('cartAmount') as HTMLElement;
    cartAmount.innerHTML = counter.toString();
  }
}
