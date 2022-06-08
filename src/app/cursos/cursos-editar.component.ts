import { CursosService } from './../shared/cursos.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-editar',
  templateUrl: './cursos-editar.component.html',
  styleUrls: ['./cursos-editar.component.scss']
})
export class CursosEditarComponent implements OnInit, OnDestroy {
  cursosForm: FormGroup;
  cursosToEdit:any;
  subscriptions:Subscription;
  constructor(private fb:FormBuilder, private cursosService: CursosService, private router:Router) { }

  ngOnInit(): void {
    this.subscriptions=new Subscription();
    this.cursosForm=this.fb.group({
      nombreCurso:['', Validators.required],
      duracion: ['', Validators.required],
      profesor:['', Validators.required]
    })
    this.subscriptions.add(this.cursosService.getCursosToEdit().subscribe(
      (val)=>this.cursosToEdit=val
    ))
  
    this.cursosService.getCursosToEdit().subscribe(
      val=>this.cursosToEdit=val
    )
    if(this.cursosToEdit){
      this.cursosForm.get('nombreCurso')?.patchValue(this.cursosToEdit.nombreCurso);
      this.cursosForm.get('duracion')?.patchValue(this.cursosToEdit.duracion);
      this.cursosForm.get('profesor')?.patchValue(this.cursosToEdit.profesor);
    }
  }

  onSubmit(){
    let cursosArray=[];
    this.cursosService.getCursosList().subscribe(
      val=>cursosArray=val
    )
    let index=1;
    if(cursosArray.length>0 && !this.cursosToEdit){
      index=cursosArray.length+1;
      this.cursosForm.value['id']=index;
      cursosArray.push(this.cursosForm.value);
    }else if(cursosArray.length===0 && !this.cursosToEdit){
      this.cursosForm.value['id']=index;
      cursosArray.push(this.cursosForm.value);
    }
    if(this.cursosToEdit){
      let indexOfProduct=cursosArray.findIndex((product)=>product.id===this.cursosToEdit.id);
      cursosArray[indexOfProduct]=this.cursosForm.value;
    }
    this.cursosService.cursosList=cursosArray!
    this.router.navigate(['/cursos-list']);
  }
  volver(){
    this.router.navigate(['/cursos-list']);
  }
  
  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

}
