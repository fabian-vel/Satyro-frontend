import { Injectable } from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(message: string, title: string = '¡Éxito!'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  // Alerta de error
  error(message: string, title: string = '¡Error!'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  // Alerta de advertencia
  warning(message: string, title: string = '¡Advertencia!'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  // Alerta de información
  info(message: string, title: string = 'Información'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  // Diálogo de confirmación
  confirm(message: string, title: string = '¿Estás seguro?'): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result: { isConfirmed: any; }) => result.isConfirmed);
  }

  message(message?: string, title?: string, icon?: SweetAlertIcon): void {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: 'Aceptar'
    });
  }
}
