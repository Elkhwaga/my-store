import { Component, OnInit } from '@angular/core';

import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartProduct: Product[] = [];
  loading: boolean = false;

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
    console.log(product);
  }
}
