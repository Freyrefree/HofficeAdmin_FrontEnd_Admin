import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces
import { TblDiasAsignados } from '../Interfaces/Data';

@Injectable({
  providedIn: 'root'
})
export class ApiDiasHOService {

  private apiUrl = 'https://g-mc.mx:8102/api/DiasSemana'; // Verifica que esta URL sea correcta para tu endpoint
  private apiUrlAsignacion = 'https://g-mc.mx:8102/api/AsignacionEmpleadoDia'; // Verifica que esta URL sea correcta para tu endpoint
  private apiUrlEliminarAsignacion = 'https://g-mc.mx:8102/api/EliminarAsignacionEmpleadoDia'; // Verifica que esta URL sea correcta para tu endpoint


  

  constructor(private httpClient: HttpClient) { }

  getDiasHO(): Observable<TblDiasAsignados[]> {
    return this.httpClient.get<TblDiasAsignados[]>(this.apiUrl); // Recuperar datos usando GET
  }

  postAsignacionDia(id: string, claveEmpleado: string): Observable<boolean> {
    const formData = new FormData();
    formData.append('ClaveEmpleado', claveEmpleado);
    formData.append('idDia', id);

    return this.httpClient.post<boolean>(this.apiUrlAsignacion, formData);
  }

  postEliminarAsignacionDia(id: string, claveEmpleado: string): Observable<boolean> {
    const formData = new FormData();
    formData.append('ClaveEmpleado', claveEmpleado);
    formData.append('idDia', id);

    return this.httpClient.post<boolean>(this.apiUrlEliminarAsignacion, formData);
  }



}
