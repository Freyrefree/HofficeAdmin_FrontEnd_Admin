import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode para decodificar el token
import { API_URLS } from 'src/app/Config/api-urls'; // Asegúrate de que la ruta sea correcta

// **************  Interfcaes **********
import { ApiResponseUsuarios, Empleado } from '../../Interfaces/Data';

@Injectable({
  providedIn: 'root',
})
export class UserService {




  private claveEmpledadoSource = new BehaviorSubject<string>('');
  claveEmpledado$ = this.claveEmpledadoSource.asObservable();

  private datosEmpleadoSource = new BehaviorSubject<Empleado | null>(null);
  datosEmpleado$ = this.datosEmpleadoSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initializeAuthState();
  }

  public initializeAuthState(): void {
    const storedClave = localStorage.getItem('claveEmpledado');
    if (storedClave) {
      this.claveEmpledadoSource.next(storedClave);
    }

    const storedEmpleado = localStorage.getItem('datosEmpleado');
    if (storedEmpleado) {
      this.datosEmpleadoSource.next(JSON.parse(storedEmpleado));
    }
  }



  // Método para obtener el token desde la URL y guardarlo en el localStorage
  obtenerYGuardarToken(): void {
    // Primero, revisar si ya existe un token en el localStorage
    const tokenEnLocalStorage = this.getToken();
    if (tokenEnLocalStorage) {
      console.log('Token encontrado en localStorage:', tokenEnLocalStorage);
      if (!this.isTokenValid(tokenEnLocalStorage)) {
        // Si el token ha expirado, redirigir al login
        this.logout();
        return;
      }

      // Obtener el claveEmpleado del token y obtener los datos del empleado
      const claveEmpleado = this.getSubFromToken(tokenEnLocalStorage);
      if (claveEmpleado) {
        this.obtenerDatosEmpleado(claveEmpleado);
      }
      return; // Si ya existe el token y es válido, no hacemos nada más
    }

    // Si no existe, buscamos el token en los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      console.log('Token recibido:', token);
      if (!this.isTokenValid(token)) {
        // Si el token ha expirado, redirigir al login
        this.logout();
        return;
      }
      this.saveToken(token); // Guardar el token en el localStorage

      // Obtener el claveEmpleado del token y obtener los datos del empleado
      const claveEmpleado = this.getSubFromToken(token);
      if (claveEmpleado) {
        this.obtenerDatosEmpleado(claveEmpleado);
      }
    } else {
      console.error('No se encontró el token en la URL.');
      this.logout(); // Redirigir al login si no se encuentra el token
    }
  }
  // Método para guardar el token en el localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && this.isTokenValid(token);
  }



  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('claveEmpledado');
    localStorage.removeItem('datosEmpleado');
    this.claveEmpledadoSource.next('');
    this.datosEmpleadoSource.next(null);
    window.location.href = API_URLS.URL_LOGIN // Redirección a otro sistema


  }

  // Método para validar si el token ha expirado
  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token); // Decodificar el token
      const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos
      const now = Date.now(); // Obtener la fecha actual en milisegundos

      // Verificar si el token ha expirado
      if (now > expirationDate) {
        console.error('Token expirado.');
        return false;
      }

      return true; // El token es válido
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false; // Si hay un error, el token no es válido
    }
  }

  // Método para obtener el sub (claveEmpleado) del token
  getSubFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token); // Decodificar el token
      return decodedToken.sub; // Retornar el sub del token
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  // Método asíncrono para obtener los módulos por usuario
  async getModulosPorUsuario(claveEmpleado:string): Promise<ApiResponseUsuarios> {
    try {
      // Preparar FormData para enviar el parámetro claveEmpleado
      const formData = new FormData();
      formData.append('claveEmpleado', claveEmpleado);

      // Realizar la solicitud POST con FormData
      const response = await lastValueFrom(this.http.post<ApiResponseUsuarios>(API_URLS.API_URL_MODULOS_POR_USUARIO, formData));
      return response;
    } catch (error) {
      console.error('Error al obtener los módulos por usuario:', error);
      throw error;
    }
  }

  private obtenerDatosEmpleado(claveEmpleado: string): void {
    const formData = new FormData();
    formData.append('claveEmpleado', claveEmpleado);

    this.http.post<Empleado[]>(API_URLS.API_URL_EMPLEADO, formData)
      .pipe(
        catchError((error) => {
          console.error('Error obteniendo datos del empleado:', error);
          return [];
        })
      )
      .subscribe((data: Empleado[]) => {
        if (data.length > 0) {
          this.datosEmpleadoSource.next(data[0]);
          localStorage.setItem('datosEmpleado', JSON.stringify(data[0]));
        } else {
          this.datosEmpleadoSource.next(null);
          localStorage.removeItem('datosEmpleado');
        }
      });
  }










  async verificarPermisosRuta(path: string | undefined): Promise<boolean> {
    // 1. Verificar que el token existe
    const token = this.getToken();
    if (!token) {
      console.error('No se encontró token en el almacenamiento');
      return false;
    }
  
    // 2. Obtener claveEmpleado del token
    const claveEmpleado = this.getSubFromToken(token);
    if (!claveEmpleado) {
      console.error('No se pudo obtener claveEmpleado del token');
      return false;
    }
  
    try {
      // 3. Obtener módulos del usuario
      const response = await this.getModulosPorUsuario(claveEmpleado);
      if (!response?.detalle?.estatus) {
        console.error('Respuesta inválida al obtener módulos');
        return false;
      }
  
      // 4. Procesar módulos obtenidos
      const permisos = response.detalle.data || [];
      const modulos = permisos.flatMap((permiso: any) => permiso.modulos || []);
  
      // 5. Mapeo de rutas a módulos requeridos
      const requiredModules: { [key: string]: string } = {
        'home': 'home',
        'fechas': 'fechas',
        'dias': 'dias',
      };
  
      // 6. Manejar ruta raíz (redirección)
      if (!path) {
        return true; // Permitir redirección a ruta por defecto
      }
  
      // 7. Verificar si la ruta está en el mapeo
      const requiredModule = requiredModules[path];
      if (!requiredModule) {
        console.warn(`La ruta '${path}' no está configurada en el sistema`);
        return false; // Denegar acceso a rutas no configuradas
      }
  
      // 8. Verificar si el usuario tiene el módulo requerido
      const tienePermiso = modulos.some(modulo => modulo.ruta === requiredModule);
      
      if (!tienePermiso) {
        console.warn(`Usuario no tiene permiso para el módulo: ${requiredModule}`);
      }
  
      return tienePermiso;
      
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      return false;
    }
  }
  
  


}