import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  vendedorForm: FormGroup;
  productToEdit:any;
  constructor(private fb:FormBuilder, private productsService: ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.vendedorForm=this.fb.group({
      nombreVendedor:['', Validators.required],
      producto: ['', Validators.required],
      precioProducto:['', Validators.required]
    })
    this.productsService.getProductToEdit().subscribe(
      val=>this.productToEdit=val
    )
    if(this.productToEdit){
      this.vendedorForm.get('nombreVendedor')?.patchValue(this.productToEdit.nombreVendedor);
      this.vendedorForm.get('producto')?.patchValue(this.productToEdit.producto);
      this.vendedorForm.get('precioProducto')?.patchValue(this.productToEdit.precioProducto);
    }
  }

  onSubmit(){
    let productos=[];
    this.productsService.getProductsList().subscribe(
      val=>productos=val
    )
    let index=1;
    if(productos.length>0 && !this.productToEdit){
      index=productos.length+1;
      this.vendedorForm.value['id']=index;
      productos.push(this.vendedorForm.value);
    }else if(productos.length===0 && !this.productToEdit){
      this.vendedorForm.value['id']=index;
      productos.push(this.vendedorForm.value);
    }
    if(this.productToEdit){
      let indexOfProduct=productos.findIndex((product)=>product.id===this.productToEdit.id);
      productos[indexOfProduct]=this.vendedorForm.value;
    }
    this.productsService.productsList=productos!
    this.router.navigate(['/products/list']);
  }

}
