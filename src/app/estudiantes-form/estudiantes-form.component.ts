import { EstudiantesService } from './../services/estudiantes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';


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
  
    this.estudiantesService.getEstudiantesToEdit().subscribe(
      val=>this.estudianteToEdit=val
    )
    if(this.estudianteToEdit){
      this.estudiantesForm.get('nombreEstudiante')?.patchValue(this.estudianteToEdit.nombreEstudiante);
      this.estudiantesForm.get('curso')?.patchValue(this.estudianteToEdit.curso);
      this.estudiantesForm.get('nota')?.patchValue(this.estudianteToEdit.nota);
    }
  }

  onSubmit(){
    let estudiatesArray=[];
    this.estudiantesService.getEstudiantesList().subscribe(
      val=>estudiatesArray=val
    )
    let index=1;
    if(estudiatesArray.length>0 && !this.estudianteToEdit){
      index=estudiatesArray.length+1;
      this.estudiantesForm.value['id']=index;
      estudiatesArray.push(this.estudiantesForm.value);
    }else if(estudiatesArray.length===0 && !this.estudianteToEdit){
      this.estudiantesForm.value['id']=index;
      estudiatesArray.push(this.estudiantesForm.value);
    }
    if(this.estudianteToEdit){
      let indexOfProduct=estudiatesArray.findIndex((product)=>product.id===this.estudianteToEdit.id);
      estudiatesArray[indexOfProduct]=this.estudiantesForm.value;
    }
    this.estudiantesService.estudianteList=estudiatesArray!
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
