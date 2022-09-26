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

  title: string = 'My Store';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}
