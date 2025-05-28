import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces
import { EmpleadoAsistenciaPorFecha } from '../Interfaces/Data';
import { API_URLS } from '../Config/api-urls';

// Servicios
import { UserService } from './Usuarios/user.service'; // Importa el UserService

@Injectable({
  providedIn: 'root'
})
export class ApiAsistenciaPorFechayEmpleadoService {

 
  constructor(
    private httpClient: HttpClient,
    private userService: UserService // Inyecta el UserService
  ) { }

  postAsistenciaPorFechas(fechaInicio: string, fechaFin: string, claveEmpleado?: string): Observable<EmpleadoAsistenciaPorFecha[]> {
    
    const claveUsuario = this.userService.getClaveEmpleadoFromDatosEmpleado();
    console.log('ClaveEmpleado obtenida:', claveUsuario);

    const formData: FormData = new FormData();
    formData.append('FechaInicio', fechaInicio);
    formData.append('FechaFin', fechaFin);
        formData.append('claveUsuario', claveUsuario ?? '');
    if (claveEmpleado) {
      formData.append('ClaveEmpleado', claveEmpleado);
    }

    return this.httpClient.post<EmpleadoAsistenciaPorFecha[]>(API_URLS.API_URL_ASISTENCIA_POR_FECHAYEMPLEADO , formData);
  }


  postReportePorFechas(fechaInicio: string, fechaFin: string, claveEmpleado?: string): Observable<EmpleadoAsistenciaPorFecha[]> {

    const claveUsuario = this.userService.getClaveEmpleadoFromDatosEmpleado();
    console.log('ClaveEmpleado obtenida:', claveUsuario);

    const formData: FormData = new FormData();
    formData.append('FechaInicio', fechaInicio);
    formData.append('FechaFin', fechaFin);
    formData.append('claveUsuario', claveUsuario ?? '');
    if (claveEmpleado) {
      formData.append('ClaveEmpleado', claveEmpleado);
    }

    return this.httpClient.post<EmpleadoAsistenciaPorFecha[]>(API_URLS.API_URL_REPORTE_POR_FECHAS, formData);

  }

}

