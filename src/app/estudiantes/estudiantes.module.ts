import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';


@NgModule({
  declarations: [
    EstudiantesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    EstudiantesRoutingModule
  ],
  providers: []
})
export class EstudiantesModule { }