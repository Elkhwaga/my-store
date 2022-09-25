import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  faCreditCard,
  faMapMarkerAlt,
  faUser,
  faClipboard,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  faUser: IconDefinition = faUser;
  faMapMarkerAlt: IconDefinition = faMapMarkerAlt;
  faCreditCard: IconDefinition = faCreditCard;
  faClipboard: IconDefinition = faClipboard;

  registerForm!: FormGroup;
  submitted = false;

  @Output() userInfo = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      creditCard: ['', [Validators.required, Validators.minLength(16)]],
    });
  }

  onSubmit(): void {
    this.userInfo.emit(this.registerForm.value);
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.registerForm.get('firstName');
  }

  get address(): AbstractControl<any, any> | null {
    return this.registerForm.get('address');
  }

  get creditCard(): AbstractControl<any, any> | null {
    return this.registerForm.get('creditCard');
  }
}
