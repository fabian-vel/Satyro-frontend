import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  /**
   * Navega a una ruta específica.
   * @param route Ruta a la que se desea navegar.
   * @param queryParams (Opcional) Parámetros de consulta.
   */
  navigateTo(route: string, queryParams?: any): void {
    this.router.navigate([route], { queryParams });
  }
}
