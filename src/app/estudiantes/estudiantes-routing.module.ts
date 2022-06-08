import { CursosListComponent } from './../cursos/cursosList.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesDetailsComponent } from './estudiantes-details/estudiantes-details.component';
import {EstudiantesListComponent } from './estudiantes-list/estudiantes-list.component';
import { EstudiantesComponent } from './estudiantes.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
    {path:'estudiantes', component:EstudiantesComponent, children:[
        {path:'list', component: EstudiantesListComponent},
        
        {path:'home', component: HomeComponent},
        {path:':id', component:EstudiantesDetailsComponent}
    ]},
    {path:'', redirectTo:'/estudiantes/list', pathMatch:'full'},
    {path:'cursos-list', component: CursosListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
