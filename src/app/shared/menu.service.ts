import { Menu } from './../interfaces/menu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_BASE = './././assets/data/menu.json';
//servicio inyectable para transferencia de datos en menu
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  //metodo que de devuelve un observable de tipo menu, el menu es un archivo json creado para simular un backend con datos
  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`$(URL_BASE)$(n)`);
  }
}
