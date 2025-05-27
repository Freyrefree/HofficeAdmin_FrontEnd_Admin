import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces
import { EmpleadoAsistenciaPorFecha } from '../Interfaces/Data';

@Injectable({
  providedIn: 'root'
})
export class ApiAsistenciaPorFechayEmpleadoService {

  private apiUrl = 'https://g-mc.mx:8102/api/AsistenciaPorFechas';
  private apiUrlReporte = 'https://g-mc.mx:8102/api/ReportePorFechas';
  

  constructor(private httpClient: HttpClient) { }

  postAsistenciaPorFechas(fechaInicio: string, fechaFin: string, claveEmpleado?: string): Observable<EmpleadoAsistenciaPorFecha[]> {
    const formData: FormData = new FormData();
    formData.append('FechaInicio', fechaInicio);
    formData.append('FechaFin', fechaFin);
    if (claveEmpleado) {
      formData.append('ClaveEmpleado', claveEmpleado);
    }

    return this.httpClient.post<EmpleadoAsistenciaPorFecha[]>(this.apiUrl, formData);
  }


  postReportePorFechas(fechaInicio: string, fechaFin: string, claveEmpleado?: string): Observable<EmpleadoAsistenciaPorFecha[]> {

    const formData: FormData = new FormData();
    formData.append('FechaInicio', fechaInicio);
    formData.append('FechaFin', fechaFin);
    if (claveEmpleado) {
      formData.append('ClaveEmpleado', claveEmpleado);
    }

    return this.httpClient.post<EmpleadoAsistenciaPorFecha[]>(this.apiUrlReporte, formData);

  }

}

