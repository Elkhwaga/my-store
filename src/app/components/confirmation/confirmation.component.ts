import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  faArrowLeft,
  faCheck,
  faTruckFast,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  faArrowLeft: IconDefinition = faArrowLeft;
  faCheck: IconDefinition = faCheck;
  faTruckFast: IconDefinition = faTruckFast;

  firstName: string | null = '';
  totalPrice: number | null = 0;

  constructor(private route: ActivatedRoute) {}

  /**
   * get first name and total price
   *
   * @memberof ConfirmationComponent
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.firstName = params.get('firstName');
      this.totalPrice = Number(params.get('totalPrice'));
    });
  }
}
