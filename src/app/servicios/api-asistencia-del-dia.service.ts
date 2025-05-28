import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interfaces
import { EmpleadoAsistencia } from '../Interfaces/Data';
//Archivo de api-urls
import { API_URLS } from '../Config/api-urls'; // Asegúrate de que la ruta sea correcta
// Servicios
import { UserService } from './Usuarios/user.service'; // Importa el UserService

@Injectable({
  providedIn: 'root'
})
export class ApiAsistenciaDelDiaService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService // Inyecta el UserService
  ) { }

  getAsistenciaDelDia(): Observable<EmpleadoAsistencia[]> {
    const claveUsuario = this.userService.getClaveEmpleadoFromDatosEmpleado();
    console.log('ClaveEmpleado obtenida:', claveUsuario);

    const formData = new FormData();
    formData.append('claveUsuario', claveUsuario ?? '');

    return this.httpClient.post<EmpleadoAsistencia[]>(API_URLS.API_URL_ASISTENCIA_DEL_DIA, formData);
  }
}
