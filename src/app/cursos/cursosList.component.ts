import { CursosService } from './../services/cursos.service';
import { RickAndMortyService } from './../services/rickandMorty.service';

import { map, Subscription, Observable, subscribeOn } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursosList.component.html',
  styleUrls: ['./cursosList.component.scss']
})
export class CursosListComponent implements OnInit {
admin: boolean = true;
character$: Subscription;
character:any;
subscriptions:Subscription;
cursos:any=[];

@ViewChild('table') table: MatTable<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
dataSource = new MatTableDataSource<any>();
displayedColumns=['nombreCurso', 'duracion', 'profesor', 'acciones'];
  

constructor(private router:Router,
            private rickAndMortyService: RickAndMortyService,
            private cursosService: CursosService) {
      this.character$ = this.rickAndMortyService.getCharacters$(2).subscribe(
        (character)=>this.character=character
      ); 
     }

  ngOnInit(): void {this.subscriptions=new Subscription();
    this.subscriptions.add(this.cursosService.getCursosList().subscribe(
      (val)=>this.cursos=val
    )
    )
   
  }
  onClickRow(el:any){
   
    this.cursosService.cursosToEdit=el;
    this.router.navigate(['/cursos-edit']);
    
  }
  
  borrarCurso(el:any){
    //Eliminación de estudiante
    let index = this.cursos.findIndex((curso: { id: any; })=> curso.id===el.id);
    this.cursos.splice(index,1);
    this.table.renderRows();
    this.cursosService.cursosList=this.cursos!;
  }
  
  //metodo para filtrado de busqueda dentro de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onAddElement(){
    this.router.navigate(['/cursos-edit']);
  }
  //metodo para ingresar a la vista con botones de edicion y eliminacion de datos
  ingresarAdmin(){
    this.admin = true;
  }
  //metodo para ingresar a la vista con permisos de usuario, solo para leer datos
  ingresarUsuario(){
    this.admin = false;
  }
}
