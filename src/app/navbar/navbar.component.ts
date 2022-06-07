import { delay, Observable, Subscription, of } from 'rxjs';


import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
 subscriptions: Subscription;
  //promesa
 asyncEditButton:Promise<string>;
 //observable
 asyncListButton:Observable<any>;

 listButton:any;

  constructor(  ) {
    
   }

  ngOnInit(): void {
    this.subscriptions=new Subscription();
  
  }
 
  
  ngOnDestroy(): void {
   
  }
}
