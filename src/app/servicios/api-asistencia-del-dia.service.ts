import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interfaces
import { EmpleadoAsistencia } from '../Interfaces/Data';

@Injectable({
  providedIn: 'root'
})
export class ApiAsistenciaDelDiaService {

  private apiUrl = 'https://g-mc.mx:8102/api/AsistenciaDelDia';

  constructor(private httpClient: HttpClient) { }

  getAsistenciaDelDia(): Observable<EmpleadoAsistencia[]> {
    return this.httpClient.get<EmpleadoAsistencia[]>(this.apiUrl);
  }
}
