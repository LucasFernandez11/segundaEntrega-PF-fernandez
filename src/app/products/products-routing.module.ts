import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
    {path:'products', component:ProductsComponent, children:[
        {path:'list', component: ProductListComponent},
        {path:':id', component:ProductDetailsComponent}
    ]},
    {path:'', redirectTo:'/products/list', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
