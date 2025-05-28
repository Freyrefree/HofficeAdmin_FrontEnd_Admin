import { Component, OnInit } from '@angular/core';
// Servicios
import { ApiDiasHOService } from 'src/app/servicios/api-dias-ho.service';
// Interfaces
import { TblDiasAsignados } from 'src/app/Interfaces/Data';

// Alertas
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dias-ho',
  templateUrl: './dias-ho.component.html',
  styleUrls: ['./dias-ho.component.css']
})
export class DiasHOComponent implements OnInit {

  allCollapsed: boolean = true; // Estado de colapso (inicialmente todos están expandidos)
  dias: TblDiasAsignados[] = []; // Variable para almacenar los días
  inputValue: string = '';
  diasInput: { id: number, dia: string, empleados: any[], inputValue?: string }[] = [
    // Tu lista de días aquí, añade inputValue como opcional
  ];
  loading: boolean = false;


  constructor(private apiDiasHOService: ApiDiasHOService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarDiasHO();
  }

  cargarDiasHO(): void {
    this.loading = true;
    this.apiDiasHOService.getDiasHO().subscribe(
      (data: TblDiasAsignados[]) => {
        this.dias = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar días:', error);
        this.snackBar.open('Error al cargar los días.', 'Cerrar', {
          duration: 6000,
          panelClass: ['mat-warn']
        });
        this.loading = false;
      }
    );
  }
  

  toggleAll() {
    this.allCollapsed = !this.allCollapsed;
  }

  validateInput(event: Event, dia: any): void {
    const input = event.target as HTMLInputElement;
    const validValue = input.value.replace(/[^0-9]/g, ''); // Elimina todo excepto dígitos
    if (validValue.length > 8) {
      dia.inputValue = validValue.slice(0, 8); // Limita a 8 dígitos
    } else {
      dia.inputValue = validValue;
    }
  }

onEnter(dia: any): void {
  if (dia.inputValue && dia.inputValue.length === 8) {
    console.log(`Día ID: ${dia.id} con valor: ${dia.inputValue}`);
    
    this.apiDiasHOService.postAsignacionDia(dia.id, dia.inputValue).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Asignación exitosa:', response.message);
          
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 6000,
            panelClass: ['mat-success'] // Usa una clase de estilo para éxito
          });
          
          this.cargarDiasHO();
        } else {
          console.log('Asignación fallida:', response.message);
          
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 6000,
            panelClass: ['mat-warn']
          });
        }
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        
        const errorMessage = error.error?.message || 'Error al conectar con el servidor';
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 6000,
          panelClass: ['mat-error'] // Asegúrate de tener esta clase en tus estilos
        });
      }
    });

  } else {
    console.log('El valor ingresado no es válido, debe tener exactamente 8 dígitos');
    this.snackBar.open('El valor ingresado no es válido, debe tener exactamente 8 dígitos', 'Cerrar', {
      duration: 6000,
      panelClass: ['mat-warn']
    });
  }
}


  eliminarEmpleado(idDia: number, claveEmpleado: string): void {
    console.log(`Eliminar empleado con clave ${claveEmpleado} del día ${idDia}`);
    
    this.apiDiasHOService.postEliminarAsignacionDia(idDia.toString(), claveEmpleado).subscribe(
      (response) => {
        if (response) {
          console.log('Eliminación realizada exitosamente');
          this.cargarDiasHO(); // Actualizar la lista de días después de eliminar
        } else {
          console.log('La eliminación falló o no se encontró el registro');
        }
      },
      (error) => {
        console.error('Ocurrió un error al eliminar el registro', error);
      }
    );
  }
  


}
