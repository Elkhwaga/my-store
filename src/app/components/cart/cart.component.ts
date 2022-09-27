import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../model/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

import {
  faTrash,
  faMoneyCheckDollar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  faTrash: IconDefinition = faTrash;
  faMoneyCheckDollar: IconDefinition = faMoneyCheckDollar;

  cartProducts!: Product[];
  totalPrice: number = 0;

  @Output() userInfo = new EventEmitter();

  /**
   * Creates an instance of CartComponent.
   * @param {CartService} cartService
   * @param {Router} route
   * @memberof CartComponent
   */
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: Router
  ) {}

  /**
   * get All cart product
   *
   * @memberof CartComponent
   */
  ngOnInit(): void {
    this.getCartProduct();
  }

  getCartProduct(): void {
    if ('cart' in localStorage) {
      this.cartProducts = this.cartService.getCartProduct();
    }
    this.getTotalPrice();
    console.log(this.cartProducts);
  }

  plusAmount(amount: number): void {
    this.cartProducts[amount].quantity++;
    this.getTotalPrice();
    this.productService.addProduct(this.cartProducts);
  }

  minsAmount(amount: number): void {
    this.cartProducts[amount].quantity--;
    this.getTotalPrice();
    this.productService.addProduct(this.cartProducts);
  }

  removeItem(index: number): void {
    this.cartProducts.splice(index, 1);
    this.getTotalPrice();
    this.productService.addProduct(this.cartProducts);
    this.reloaded();
  }

  changeAmount(): void {
    this.getTotalPrice();
    this.productService.addProduct(this.cartProducts);
  }

  getTotalPrice(): void {
    for (let price in this.cartProducts) {
      this.totalPrice +=
        this.cartProducts[price].item.price * this.cartProducts[price].quantity;
    }
  }

  onSubmit(info: { firstName: any }): void {
    this.cartService.clearCart();
    this.route.navigate([`confirmation/${info.firstName}/${this.totalPrice}`]);
  }

  reloaded(): void {
    window.location.reload();
  }
}
