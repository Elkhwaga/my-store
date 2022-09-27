import { Component, OnInit } from '@angular/core';

import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit {
  products: Product[] = [];
  cartProduct: Product[] = [];
  loading: boolean = false;
  shoppingBag: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.productService.getAllProduct().subscribe(
      (res: Product[]) => {
        console.log(res);
        this.products = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error.massage);
      }
    );
  }

  addToCart(product: Product): void {
    if ('cart' in localStorage) {
      this.cartProduct = this.cartService.getCartProduct();
      let exist = this.cartProduct.find(
        (ele) => ele.item.id == product.item.id
      );
      if (exist) {
        alert(`The <<${product.item.name}>> already exists.`);
      } else {
        this.cartProduct.push(product);
        this.productService.addProduct(this.cartProduct);
      }
    } else {
      this.cartProduct.push(product);
      this.productService.addProduct(this.cartProduct);
    }
    this.getShoppingBag();
  }

  getShoppingBag(): void {
    let cartNumber = this.cartService.getCartProduct();
    this.shoppingBag = cartNumber.length;
    this.productService.cartSubject.next(this.shoppingBag);
    // console.log(this.shoppingBag);
  }
}
