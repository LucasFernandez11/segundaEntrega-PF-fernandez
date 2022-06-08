import { EstudiantesService } from './../../services/estudiantes.service';
import { RickAndMortyService } from './../../services/rickandMorty.service';
import { Usuario } from './../../usuario';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Subscription, Observable, subscribeOn } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-product-list',
  templateUrl: './estudiantes-list.component.html',
  styleUrls: ['./estudiantes-list.component.scss']
})
export class EstudiantesListComponent implements OnInit, OnDestroy {
  
  estudiantes:any=[];
  subscriptions:Subscription;
  admin: boolean = true;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns=['nombreEstudiante', 'curso', 'nota', 'acciones'];

  character$: Subscription;
  character:any;
  user = new Usuario('username1');


  constructor(private router:Router, 
              private estudiantesService:EstudiantesService,
              private rickAndMortyService: RickAndMortyService
              ){
                this.character$ = this.rickAndMortyService.getCharacters$(5).subscribe(
                  (character)=>this.character=character
                ); 
               
              }
    

  ngOnInit(): void {
    this.subscriptions=new Subscription();
    this.subscriptions.add(this.estudiantesService.getEstudiantesList().subscribe(
      (val)=>this.estudiantes=val
    )
    )
    
  }

  onClickRow(el:any){
   
    this.estudiantesService.estudianteToEdit=el;
    this.router.navigate(['/add-edit-estudiantes']);
    
  }

  borrarEstudiante(el:any){
    //Eliminación de estudiante
    let index = this.estudiantes.findIndex((student: { id: any; })=> student.id===el.id);
    this.estudiantes.splice(index,1);
    this.table.renderRows();
    this.estudiantesService.estudianteList=this.estudiantes!;
  }

  //metodo para filtrado de busqueda dentro de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddElement(){
    this.router.navigate(['/add-edit-estudiantes']);
  }
   //metodo para ingresar a la vista con botones de edicion y eliminacion de datos
 ingresarAdmin(){
  this.admin = true;
}
//metodo para ingresar a la vista con permisos de usuario, solo para leer datos
ingresarUsuario(){
  this.admin = false;
}



  ngOnDestroy(): void {
    this.character$.unsubscribe();
  }


}
