import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';

import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  faPlus: IconDefinition = faPlus;
  @Input() data!: Product;
  @Output() item = new EventEmitter();
  amount: number = 1;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {}

  addItem(): void {
    this.item.emit({ item: this.data, quantity: this.amount });
  }
}
