import { Component, OnInit, Input, Output,EventEmitter,ViewChild   } from '@angular/core';
import { Router } from '@angular/router';

//interfaces
import { EmpleadoAsistencia } from 'src/app/Interfaces/Data';

declare var bootstrap: any; // Declara la variable bootstrap para usarla más adelante


@Component({
  selector: 'app-empleado-tarjeta',
  templateUrl: './empleado-tarjeta.component.html',
  styleUrls: ['./empleado-tarjeta.component.css']
})
export class EmpleadoTarjetaComponent {

  @Input() amigurumi: any = {};
  @Input() empleado: EmpleadoAsistencia = {} as EmpleadoAsistencia;

  @Input() index: number = 0
  @Output() amigurumiSeleccionado:EventEmitter<number>;



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
