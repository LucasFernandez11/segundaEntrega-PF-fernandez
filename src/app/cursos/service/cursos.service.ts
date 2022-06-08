import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursosList:any=[];
  cursosToEdit:any;
  constructor() { }
  getCursosList():Observable<any>{
    return of(this.cursosList)
  }
  getCursosToEdit():Observable<any>{
    return of(this.cursosToEdit);
  }
}
