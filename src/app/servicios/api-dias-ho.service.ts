import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces
import { TblDiasAsignados,ApiResponse } from '../Interfaces/Data';
// Archivo de api-urls
import { API_URLS } from '../Config/api-urls'; // Asegúrate de que la ruta sea correcta
// Servicios
import { UserService } from './Usuarios/user.service'; // Importa el UserService

@Injectable({
  providedIn: 'root'
})
export class ApiDiasHOService {


  constructor(
    private httpClient: HttpClient,
    private userService: UserService // Inyecta el UserService
  ) { }

  // getDiasHO(): Observable<TblDiasAsignados[]> {
  //   return this.httpClient.get<TblDiasAsignados[]>(API_URLS.API_URL_DIAS_SEMANA); // Recuperar datos usando GET
  // }
  getDiasHO(): Observable<TblDiasAsignados[]> {
    const claveUsuario = this.userService.getClaveEmpleadoFromDatosEmpleado();
    console.log('ClaveEmpleado obtenida:', claveUsuario);


    const formData = new FormData();
    formData.append('claveUsuario', claveUsuario ?? '');

    return this.httpClient.post<TblDiasAsignados[]>(API_URLS.API_URL_DIAS_SEMANA, formData);
  }


postAsignacionDia(id: string, claveEmpleado: string): Observable<ApiResponse> {
  const claveUsuario = this.userService.getClaveEmpleadoFromDatosEmpleado();
  console.log('ClaveEmpleado obtenida:', claveUsuario);

  const formData = new FormData();
  formData.append('ClaveEmpleado', claveEmpleado);
  formData.append('idDia', id);
  formData.append('claveUsuario', claveUsuario ?? '');

  return this.httpClient.post<ApiResponse>(API_URLS.API_URL_ASIGNACION_EMPLEADO_DIA, formData);
}

  postEliminarAsignacionDia(id: string, claveEmpleado: string): Observable<boolean> {
    const formData = new FormData();
    formData.append('ClaveEmpleado', claveEmpleado);
    formData.append('idDia', id);

    return this.httpClient.post<boolean>(API_URLS.API_URL_ELIMINAR_ASIGNACION_EMPLEADO_DIA, formData);
  }



}
