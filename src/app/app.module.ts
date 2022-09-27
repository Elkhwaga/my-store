import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AllProductComponent } from './components/product-item/all-product/all-product.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { NavbarComponent } from './layout/navbar/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { SuccessfulOrderComponent } from './components/successful-order/successful-order.component';
import { ProductByIdComponent } from './components/product-item/product-by-id/product-by-id.component';

import { SpinnerComponent } from './layout/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CartShoppingComponent,
    NavbarComponent,
    UserInfoComponent,
    AllProductComponent,
    SuccessfulOrderComponent,
    ProductByIdComponent,
    SpinnerComponent,
    ProductItemComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
