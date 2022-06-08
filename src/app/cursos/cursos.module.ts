import { CursosRoutingModule } from './cursos-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { CursosEditarComponent } from './cursos-editar.component';



import { CursosListComponent } from './cursosList.component';
import { CursosComponent } from './cursos.component';

const cursosRoutes = [
  {path:'cursos-edit', component:CursosEditarComponent},
] 

@NgModule({
  declarations: [
    // CursosListComponent,
    // CursosEditarComponent
  
    CursosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CursosRoutingModule
   
  ], exports: [
    // CursosListComponent,
    // CursosEditarComponent
  ]
})
export class CursosModule { }
