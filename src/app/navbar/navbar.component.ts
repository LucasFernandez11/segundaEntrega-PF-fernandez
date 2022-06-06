import { map, Observable, Subscription } from 'rxjs';
import { MenuService } from './../shared/menu.service';
import { Menu } from './../interfaces/menu';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menu:Menu[]=[];
  menu$: Subscription;
  constructor(private menuService: MenuService ) {
    // this.menu$ = this.menuService.getMenu()
    // .pipe(
    //   map( (x:any)=>{
    //     return {name: x.nombre, redirect: x.redirect};
    //   })
    // )
   }

  ngOnInit(): void {
    this.cargarMenu();
  }
  cargarMenu(): void {
    this.menuService.getMenu().subscribe(data => {
      // console.log(data) ;
      this.menu = data;
    });
  }
  ngOnDestroy(): void {
    this.menu$.unsubscribe();
  }
}
