import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interfaces
import { EmpleadoAsistencia } from '../Interfaces/Data';
//Archivo de api-urls
import { API_URLS } from '../Config/api-urls'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ApiAsistenciaDelDiaService {


  constructor(private httpClient: HttpClient) { }

  getAsistenciaDelDia(): Observable<EmpleadoAsistencia[]> {
    return this.httpClient.get<EmpleadoAsistencia[]>(API_URLS.API_URL_ASISTENCIA_DEL_DIA);
  }
}
