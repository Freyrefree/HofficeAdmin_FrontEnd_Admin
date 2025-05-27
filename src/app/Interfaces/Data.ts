//************* Interfaz para datos de USUARIOS ***********************

export interface ModulosUsuario {
  idModulo: number;
  modulo: string;
  ruta: string;
  icono: string;
}

export interface PermisosUsuario {
  claveEmpleado: string;
  nombre: string;
  perfil: string;
  modulos: ModulosUsuario[];
}

export interface ApiResponseUsuarios {
  message: string;
  detalle: {
    estatus: boolean;
    data: PermisosUsuario[];
  };
}

export interface Empleado {
  claveEmpleado: string;
  nombreCompleto: string;
  area: string;
  puesto: string;
  correo: string;
  rfc: string;
  nss: string;
}


export interface ApiResponseUsuariosData {
  message: string;
  detalle: {
    estatus: boolean;
    data: Usuarios[];
  };
}

export interface Usuarios {
  id: number;
  nombre: string | null;
  usuario: string | null;
  fechaRegistro: Date | null;
  estatus: number | null;
  perfil: string | null;
  idPerfil: number | null;
}

export interface RespuestaUsuario {
  respuesta: boolean;
  mensaje: string;
}

//*********************************************
export interface EmpleadoA{

    nombre: string;
    bio: string;
    img: string;
    aparicion: string;
    casa: string;
    idx?: number;
    
}

/// ***************************  Asistencia del Día **************************

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
  diaHO: boolean;
}


// **************************** Dias Home Office  *****************************


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


