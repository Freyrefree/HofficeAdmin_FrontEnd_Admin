import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSincronizarCodigosSAPService {

  private apiUrl = 'http://192.168.1.14:8100/api/SincronizacionCodigosLiberacion';

  constructor(private httpClient: HttpClient) { }

  sincronizarDatos(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
}
