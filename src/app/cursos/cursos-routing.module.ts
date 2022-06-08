import { HomeComponent } from '../home/home.component';
import { CursosComponent } from './cursos.component';
import { CursosListComponent } from './cursosList.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CursosEditarComponent } from './cursos-editar.component';
const routesCursos: Routes = [
  {path:'cursos', component:CursosComponent, children:[
      {path:'list', component: CursosListComponent},
      
      {path:'home', component: HomeComponent},
     
  ]},
  {path:'', redirectTo:'/cursos/list', pathMatch:'full'},
  {path:'cursos-list', component: CursosListComponent},
  {path:'cursos-edit', component: CursosEditarComponent},
];



@NgModule({
  imports: [
    [RouterModule.forChild(routesCursos)],
  ],
  exports: [RouterModule]

})
export class CursosRoutingModule { }
