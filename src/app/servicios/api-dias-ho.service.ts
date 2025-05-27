import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces
import { TblDiasAsignados } from '../Interfaces/Data';
// Archivo de api-urls
import { API_URLS } from '../Config/api-urls'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ApiDiasHOService {


  constructor(private httpClient: HttpClient) { }

  getDiasHO(): Observable<TblDiasAsignados[]> {
    return this.httpClient.get<TblDiasAsignados[]>(API_URLS.API_URL_DIAS_SEMANA); // Recuperar datos usando GET
  }

  postAsignacionDia(id: string, claveEmpleado: string): Observable<boolean> {
    const formData = new FormData();
    formData.append('ClaveEmpleado', claveEmpleado);
    formData.append('idDia', id);

    return this.httpClient.post<boolean>(API_URLS.API_URL_ASIGNACION_EMPLEADO_DIA, formData);
  }

  postEliminarAsignacionDia(id: string, claveEmpleado: string): Observable<boolean> {
    const formData = new FormData();
    formData.append('ClaveEmpleado', claveEmpleado);
    formData.append('idDia', id);

    return this.httpClient.post<boolean>(API_URLS.API_URL_ELIMINAR_ASIGNACION_EMPLEADO_DIA, formData);
  }



}
