import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, productCount } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import {
  faArrowLeft,
  faPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  faArrowLeft: IconDefinition = faArrowLeft;
  faPlus: IconDefinition = faPlus;

  id: number | null = null;
  products: Product[] = [];
  product: Product | null = null;
  productCount: string[] = productCount;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.productService.getAllProduct().subscribe((res: any) => {
      this.products = res;
      this.product = this.getProductById(this.id);
      console.log(this.product);
    });
  }

  /**
   * get Product by id
   *
   * @param {(number | null)} id
   * @return {Array}  {Product}
   * @memberof ProductItemDetailComponent
   */
  getProductById(id: number | null): Product {
    return this.products.filter((product) => product.id === id)[0];
  }

  /**
   *
   * @param {Product} cartProduct
   * @param {*} event
   * @memberof ProductItemDetailComponent
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
