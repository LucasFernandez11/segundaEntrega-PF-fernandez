import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productos:any=[];
  subscriptions:Subscription;
  displayedColumns=['producto', 'precio', 'vendedor', 'delete'];
  constructor(private router:Router, private productsService:ProductsService) { }

  ngOnInit(): void {
    this.subscriptions=new Subscription();
    this.subscriptions.add(this.productsService.getProductsList().subscribe(
      (val)=>this.productos=val
    )
    )
  }

  onClickRow(el:any){
    this.productsService.productToEdit=el;
    this.router.navigate(['/add-edit-product']);
  }

  onDeleteElement(el:any){}

  onAddElement(){
    this.router.navigate(['/add-edit-product']);
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

}
