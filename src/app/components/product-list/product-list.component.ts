import { Component, OnInit } from '@angular/core';

import { Product, productCount } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  faPlus: IconDefinition = faPlus;

  products: Product[] = [];
  productCount: string[] = productCount;

  selectedItem: string = '1';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      },
      (error) => console.log(error)
    );
  }

  /**
   *
   * @param {Product} cartProduct
   * @param {*} event
   * @memberof ProductListComponent
   */
  onSubmit(cartProduct: Product, event: any): void {
    let newCartProduct: Product[] = [];
    let message: string = '';
    let isCartOptionExist: boolean = false;

    const selectedOption =
      event.target[0].options[event.target[0].options.selectedIndex].value;
    const cartProducts: Product[] | [] = this.cartService.getCartProduct();

    const cartIdx = cartProducts.findIndex(
      (cart) => cart.id === cartProduct.id
    );
    newCartProduct = cartProducts;

    if (cartIdx === -1 || cartProducts.length === 0) {
      newCartProduct.push(
        Object.assign(cartProduct, { amount: selectedOption })
      );
      message = `New Item '${cartProduct.name}' added to cart`;
    } else {
      const amount: string = newCartProduct[cartIdx].amount;
      isCartOptionExist = selectedOption === amount;

      if (isCartOptionExist) {
        message = `${amount} Item(s) of '${cartProduct.name}' already exist in cart.`;
      } else {
        newCartProduct[cartIdx].id = cartProduct.id;
        newCartProduct[cartIdx].amount = selectedOption;
        message = `${amount} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${selectedOption}`;
      }
    }
    !isCartOptionExist ? this.productService.addProduct(newCartProduct) : null;
    alert(message);
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
