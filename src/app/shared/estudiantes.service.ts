import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EstudiantesService {
  estudianteList:any=[];
  estudianteToEdit:any;
  constructor() { }

  getEstudiantesList():Observable<any>{
    return of(this.estudianteList)
  }
  getEstudiantesToEdit():Observable<any>{
    return of(this.estudianteToEdit);
  }
}
