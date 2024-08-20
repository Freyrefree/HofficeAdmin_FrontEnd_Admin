import { Component, OnInit } from '@angular/core';
// Servicios
import { ApiDiasHOService } from 'src/app/servicios/api-dias-ho.service';
// Interfaces
import { TblDiasAsignados } from 'src/app/servicios/amigurumis.service';

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

  constructor(private apiDiasHOService: ApiDiasHOService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarDiasHO();
  }

  cargarDiasHO(): void {
    this.apiDiasHOService.getDiasHO().subscribe((data: TblDiasAsignados[]) => {
      this.dias = data;
      // console.log("DATA DIAS:", this.dias);
    });
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
      // Aquí puedes realizar otras acciones si lo necesitas
       // Consumir el API para realizar la asignación del día
       this.apiDiasHOService.postAsignacionDia(dia.id, dia.inputValue).subscribe(
        (response) => {
          if (response) {
            console.log('Asignación realizada exitosamente');



            this.cargarDiasHO();

            
          } else {
            console.log('La asignación falló o ya existe');

            this.snackBar.open('La asignación falló o ya existe', 'Cerrar', {
              duration: 6000,
              panelClass: ['mat-warn']
            });
      


          }
        },
        (error) => {
          console.error('Ocurrió un error al asignar el día', error);
        }
      );





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
