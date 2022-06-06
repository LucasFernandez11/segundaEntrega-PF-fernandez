import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFuentes]'
})
export class FuentesDirective {
  //directiva para el trato de fuentes en el html, se utilizaran para mas cambios 
  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.fontSize = '20px';
  }

}
