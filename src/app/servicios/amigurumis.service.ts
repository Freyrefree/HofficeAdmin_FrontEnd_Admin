import { Injectable } from "@angular/core";


@Injectable()
export class AmigurumisService{



    constructor(){
        console.log("Servicio Listo");
    }





}

export interface Amigurumi{

    nombre: string;
    bio: string;
    img: string;
    aparicion: string;
    casa: string;
    idx?: number;
    
}

/// ***************************  Asistencia del Díaa **************************

export interface Acceso {
  fechaHora: string;
  secondaryPath: string;
}

export interface EmpleadoAsistencia {
  claveEmpleado: string;
  mainPicture: string;
  nombreCompleto: string;
  rfc: string;
  fecha: string;
  accesos: Acceso[];
}

// **************************** Asistencia Por fechas *****************************

export interface EmpleadoAsistenciaPorFecha {
  claveEmpleado:  string;
  mainPicture:    string;
  nombreCompleto: string;
  rfc:            string;
  fechas:         Fecha[];
}

export interface Fecha {
  fecha:   Date;
  accesos: Acceso[];
}


// **************************** Dias Home Office  *****************************
// export interface TblDiasAsignados {
//   id: number;
//   numeroDia?: number;
//   dia?: string;
//   estatus?: number;
//   fechaRegistro?: Date;
// }

export interface TblDiasAsignados {
  id: number;
  numeroDia?: number;
  dia: string;
  estatus?: number;
  fechaRegistro?: Date;
  empleados: DatosEmpleado[];
  inputValue?: string; // Añadir esta línea
}

export interface DatosEmpleado {
  claveEmpleado: string;
  nombreCompleto: string;
  area: string;
  puesto: string;
  correo: string;
  rfc: string;
  nss: string;
}





