import { Component, OnInit } from '@angular/core';
// Servicios
import { ApiDiasHOService } from 'src/app/servicios/api-dias-ho.service';
// Interfaces
import { TblDiasAsignados } from 'src/app/servicios/amigurumis.service';


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

  constructor(private apiDiasHOService: ApiDiasHOService) { }

  ngOnInit(): void {
    this.apiDiasHOService.getDiasHO().subscribe((data: TblDiasAsignados[]) => {
      this.dias = data;
      console.log("DATA DIAS:" , this.dias);
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

      


    } else {
      console.log('El valor ingresado no es válido, debe tener exactamente 8 dígitos');
    }
  }
  


}
