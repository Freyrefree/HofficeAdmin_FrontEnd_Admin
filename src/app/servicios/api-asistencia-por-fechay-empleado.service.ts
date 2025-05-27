import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces
import { EmpleadoAsistenciaPorFecha } from '../Interfaces/Data';
import { API_URLS } from '../Config/api-urls';

@Injectable({
  providedIn: 'root'
})
export class ApiAsistenciaPorFechayEmpleadoService {

 
  constructor(private httpClient: HttpClient) { }

  postAsistenciaPorFechas(fechaInicio: string, fechaFin: string, claveEmpleado?: string): Observable<EmpleadoAsistenciaPorFecha[]> {
    const formData: FormData = new FormData();
    formData.append('FechaInicio', fechaInicio);
    formData.append('FechaFin', fechaFin);
    if (claveEmpleado) {
      formData.append('ClaveEmpleado', claveEmpleado);
    }

    return this.httpClient.post<EmpleadoAsistenciaPorFecha[]>(API_URLS.API_URL_ASISTENCIA_POR_FECHAYEMPLEADO , formData);
  }


  postReportePorFechas(fechaInicio: string, fechaFin: string, claveEmpleado?: string): Observable<EmpleadoAsistenciaPorFecha[]> {

    const formData: FormData = new FormData();
    formData.append('FechaInicio', fechaInicio);
    formData.append('FechaFin', fechaFin);
    if (claveEmpleado) {
      formData.append('ClaveEmpleado', claveEmpleado);
    }

    return this.httpClient.post<EmpleadoAsistenciaPorFecha[]>(API_URLS.API_URL_REPORTE_POR_FECHAS, formData);

  }

}

