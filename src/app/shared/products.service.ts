import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsList:any=[];
  productToEdit:any;
  constructor() { }

  getProductsList():Observable<any>{
    return of(this.productsList)
  }

  getProductToEdit():Observable<any>{
    return of(this.productToEdit);
  }
}
