import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

//servicios
import { ApiAsistenciaDelDiaService } from 'src/app/servicios/api-asistencia-del-dia.service';


//interfaces
import { EmpleadoAsistencia } from 'src/app/Interfaces/Data';
import { EmpleadoA } from 'src/app/Interfaces/Data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  asistenciaDelDia: EmpleadoAsistencia[] = [];
  loading: boolean = false;


  

  constructor(
    private apiAsistenciaDelDiaService: ApiAsistenciaDelDiaService,
    private route: ActivatedRoute
    ){

    console.log("Constructor");

  }

  amigurumis:EmpleadoA[]=[];

  ngOnInit(): void {
    this.loading = true; // Activar el loading

    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token recibido:', token);
      } else {
        console.error('No se recibió el token.');
      }
    });
  


    console.log("ngOnInit");

    this.apiAsistenciaDelDiaService.getAsistenciaDelDia().subscribe(
      data => {
        this.asistenciaDelDia = data;
        console.log('Asistencia del día:', this.asistenciaDelDia);
        this.loading = false; // Desactivar el loading
      },
      error => {
        console.error('Error al obtener la asistencia del día:', error);
        this.loading = false; // Desactivar el loading
      }
    );

  }


  private receiveToken(): void {

  }




}
