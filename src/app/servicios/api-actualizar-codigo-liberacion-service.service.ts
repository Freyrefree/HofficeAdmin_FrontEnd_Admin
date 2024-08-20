import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiActualizarCodigoLiberacionService {

  private apiUrl = 'http://192.168.1.14:8100/api/ActualizarCodigoLiberacion';

  constructor(private httpClient: HttpClient) { }

  // actualizarCodigo(claveEmpleado: string, codigoLiberacion: string): Observable<any> {
  //   return this.httpClient.post(this.apiUrl, { claveEmpleado, codigoLiberacion });
  // }

  actualizarCodigo(claveEmpleado: string, codigoLiberacion: string): Observable<any> {
    const formData = new FormData();
    formData.append('claveEmpleado', claveEmpleado);
    formData.append('codigoLiberacion', codigoLiberacion);
    return this.httpClient.post(this.apiUrl, formData);
  }

}