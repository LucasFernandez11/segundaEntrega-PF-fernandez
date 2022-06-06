import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesDetailsComponent } from './estudiantes-details/estudiantes-details.component';
import {EstudiantesListComponent } from './estudiantes-list/estudiantes-list.component';
import { EstudiantesComponent } from './estudiantes.component';

const routes: Routes = [
    {path:'estudiantes', component:EstudiantesComponent, children:[
        {path:'list', component: EstudiantesListComponent},
        {path:':id', component:EstudiantesDetailsComponent}
    ]},
    {path:'', redirectTo:'/estudiantes/list', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
