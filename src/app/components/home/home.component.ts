import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Amigurumi } from 'src/app/servicios/amigurumis.service';
import { ActivatedRoute } from '@angular/router';

//servicios
import { AmigurumisService } from 'src/app/servicios/amigurumis.service';
import { ApiAsistenciaDelDiaService } from 'src/app/servicios/api-asistencia-del-dia.service';


//interfaz
import { EmpleadoAsistencia } from 'src/app/servicios/amigurumis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  asistenciaDelDia: EmpleadoAsistencia[] = [];
  loading: boolean = false;


  

  constructor(
    private _amigurumisService:AmigurumisService,
    private _router:Router,
    private apiAsistenciaDelDiaService: ApiAsistenciaDelDiaService,
    private route: ActivatedRoute
    ){

    console.log("Constructor");

  }

  amigurumis:Amigurumi[]=[];

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
  

    // this.receiveToken();

    // console.log("ngOnInit");
    // this.amigurumis=this._amigurumisService.getAmigurumis();
    // console.log(this.amigurumis);

    // this.apiAsistenciaDelDiaService.getAsistenciaDelDia().subscribe(
    //   data => {
    //     this.asistenciaDelDia = data;
    //     console.log('Asistencia del día:', this.asistenciaDelDia);
    //   },
    //   error => {
    //     console.error('Error al obtener la asistencia del día:', error);
    //   }
    // );
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
