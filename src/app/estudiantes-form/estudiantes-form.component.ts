import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EstudiantesService } from '../shared/estudiantes.service';

@Component({
  selector: 'app-estudiantes-form',
  templateUrl: './estudiantes-form.component.html',
  styleUrls: ['./estudiantes-form.component.scss']
})
export class EstudiantesFormComponent implements OnInit, OnDestroy {
  estudiantesForm: FormGroup;
  estudianteToEdit:any;
  subscriptions:Subscription;
  constructor(private fb:FormBuilder, private estudiantesService: EstudiantesService, private router:Router) { }

  ngOnInit(): void {
    this.subscriptions=new Subscription();
    this.estudiantesForm=this.fb.group({
      nombreEstudiante:['', Validators.required],
      curso: ['', Validators.required],
      nota:['', Validators.required]
    })
    this.subscriptions.add(this.estudiantesService.getEstudiantesToEdit().subscribe(
      (val)=>this.estudianteToEdit=val
    ))
  
    // this.estudiantesService.getEstudiantesToEdit().subscribe(
    //   val=>this.estudianteToEdit=val
    // )
    if(this.estudianteToEdit){
      this.estudiantesForm.get('nombreEstudiante')?.patchValue(this.estudianteToEdit.nombreEstudiante);
      this.estudiantesForm.get('curso')?.patchValue(this.estudianteToEdit.curso);
      this.estudiantesForm.get('nota')?.patchValue(this.estudianteToEdit.nota);
    }
  }

  onSubmit(){
    let productos=[];
    this.estudiantesService.getEstudiantesList().subscribe(
      val=>productos=val
    )
    let index=1;
    if(productos.length>0 && !this.estudianteToEdit){
      index=productos.length+1;
      this.estudiantesForm.value['id']=index;
      productos.push(this.estudiantesForm.value);
    }else if(productos.length===0 && !this.estudianteToEdit){
      this.estudiantesForm.value['id']=index;
      productos.push(this.estudiantesForm.value);
    }
    if(this.estudianteToEdit){
      let indexOfProduct=productos.findIndex((product)=>product.id===this.estudianteToEdit.id);
      productos[indexOfProduct]=this.estudiantesForm.value;
    }
    this.estudiantesService.estudianteList=productos!
    this.router.navigate(['/estudiantes/list']);
  }
  volver(){
    this.router.navigate(['/estudiantes/list']);
  }
  promise = new Promise((resolve, reject) => {
    const number = Math.floor(Math.random() * 10);
  
    setTimeout(
      () => number > 5
        ? resolve(number)
        : reject(new Error('Menor a 5')),
      1000
    );
  });
  
  
 
  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

}
