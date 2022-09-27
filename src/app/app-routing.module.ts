import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { AllProductComponent } from './components/product-item/all-product/all-product.component';
import { SuccessfulOrderComponent } from './components/successful-order/successful-order.component';
import { ProductByIdComponent } from './components/product-item/product-by-id/product-by-id.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'all-product', component: AllProductComponent },
  { path: 'item/:id', component: ProductByIdComponent },
  { path: 'cart-shopping', component: CartShoppingComponent },
  {
    path: 'successful-order/:firstName/:totalPrice',
    component: SuccessfulOrderComponent,
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
