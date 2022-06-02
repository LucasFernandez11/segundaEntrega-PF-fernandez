import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';


@NgModule({
  declarations: [
      ProductsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ProductsRoutingModule
  ],
  providers: []
})
export class ProductsModule { }