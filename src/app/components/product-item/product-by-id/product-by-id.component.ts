import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product.service';

import {
  faArrowLeft,
  faPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.css'],
})
export class ProductByIdComponent implements OnInit {
  faArrowLeft: IconDefinition = faArrowLeft;
  faPlus: IconDefinition = faPlus;

  id!: number;
  products!: Product[];
  data!: Product;
  // cartProduct: any = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.productService.getAllProduct().subscribe(
      (res: Product[]) => {
        this.products = res;
        this.data = this.getProductById(this.id);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        console.log(err.massage);
      }
    );
  }

  getProductById(id: number): Product {
    return this.products.filter((item) => item.id === id)[0];
  }
}
