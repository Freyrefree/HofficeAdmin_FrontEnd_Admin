import { Component, OnInit, Input, Output,EventEmitter,ViewChild   } from '@angular/core';
import { Router } from '@angular/router';
import { FotoEmpleadoModalComponent } from '../foto-empleado-modal/foto-empleado-modal.component';

//servicios
import { EmpleadoAsistencia } from 'src/app/servicios/amigurumis.service';
declare var bootstrap: any; // Declara la variable bootstrap para usarla más adelante


@Component({
  selector: 'app-amigurumi-tarjeta',
  templateUrl: './amigurumi-tarjeta.component.html',
  styleUrls: ['./amigurumi-tarjeta.component.css']
})
export class AmigurumiTarjetaComponent {

  @Input() amigurumi: any = {};
  @Input() empleado: EmpleadoAsistencia = {} as EmpleadoAsistencia;

  @Input() index: number = 0
  @Output() amigurumiSeleccionado:EventEmitter<number>;

  @ViewChild(FotoEmpleadoModalComponent) modal!: FotoEmpleadoModalComponent;


  selectedImageUrl: string = '';

  constructor(private _router:Router){
    this.amigurumiSeleccionado = new EventEmitter();

  }

  ngOnInit(){

  }

  formatFechaHora(fechaHora: string): string {
    const fecha = new Date(fechaHora);
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    const hours = ('0' + fecha.getHours()).slice(-2);
    const minutes = ('0' + fecha.getMinutes()).slice(-2);
    const seconds = ('0' + fecha.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }




  openImage(url: string): void {
    console.log(url);
    // this.selectedImageUrl = url;
    // this.modal.openModal();
    window.open(url, '_blank', 'noopener,noreferrer');
  }




}
