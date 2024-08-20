import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TblDiasAsignados } from './amigurumis.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDiasHOService {

  private apiUrl = 'https://g-mc.mx:8102/api/DiasSemana'; // Verifica que esta URL sea correcta para tu endpoint

  constructor(private httpClient: HttpClient) { }

  getDiasHO(): Observable<TblDiasAsignados[]> {
    return this.httpClient.get<TblDiasAsignados[]>(this.apiUrl); // Cambiado de post a get si solo estás recuperando datos
  }

  


}
