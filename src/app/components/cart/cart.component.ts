import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Product, productCount } from '../../model/product';
import { CartService } from '../../services/cart.service';

import {
  faTrash,
  faMoneyCheckDollar,
  faCartPlus,
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
  faCartPlus: IconDefinition = faCartPlus;

  cartProducts: Product[] = [];
  productCount: string[] = productCount;
  totalPrice: number = 0;
  selectedItem: string = '';

  @Output() userInfo = new EventEmitter();

  /**
   * Creates an instance of CartComponent.
   * @param {CartService} cartService
   * @param {Router} route
   * @memberof CartComponent
   */
  constructor(private cartService: CartService, private route: Router) {}

  /**
   * get All cart product
   *
   * @memberof CartComponent
   */
  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProduct();
    this.calculateTotal();
  }

  /**
   * clear all cart and success massage after completed order
   *
   * @param {*} value
   * @memberof CartComponent
   */
  onSubmit(value: any): void {
    this.cartService.clearCart();
    this.route.navigate([`success/${value.firstName}/${this.totalPrice}`]);
  }

  /**
   * reloaded page after change
   *
   * @memberof CartComponent
   */
  refresh(): void {
    window.location.reload();
  }

  /**
   * selected amount product and calc all product
   *
   * @param {string} value
   * @param {Product} product
   * @memberof CartComponent
   */
  selectChange(value: string, product: Product): void {
    const index = this.cartProducts.indexOf(product);
    this.cartProducts[index] = product;
    this.cartProducts[index].amount = value;
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
    this.calculateTotal();
    this.refresh();
  }

  /**
   * calculate Total
   *
   * @memberof CartComponent
   */
  calculateTotal(): void {
    this.totalPrice = this.cartProducts.reduce((acc, item) => {
      this.totalPrice = parseFloat(
        (acc + item.price * Number(item.amount)).toFixed(2)
      );
      return this.totalPrice;
    }, 0);
  }

  /**
   * delete cart by id
   *
   * @param {number} id
   * @memberof CartComponent
   */
  deletedItem(id: number): void {
    const storageProducts = this.cartService.getCartProduct();
    const products = storageProducts.filter(
      (product: Product) => product.id !== id
    );
    window.localStorage.clear();
    localStorage.setItem('products', JSON.stringify(products));
    this.refresh();
    this.calculateTotal();
  }
}
