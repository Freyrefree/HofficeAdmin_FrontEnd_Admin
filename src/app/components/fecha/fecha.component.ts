import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//servicios
import { AmigurumisService, EmpleadoAsistenciaPorFecha } from 'src/app/servicios/amigurumis.service';
import { ApiAsistenciaPorFechayEmpleadoService } from 'src/app/servicios/api-asistencia-por-fechay-empleado.service';

// Alertas
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-amigurumis',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css'] // Añadir el archivo de estilos si es necesario
})
export class FechaComponent implements OnInit {
  form: FormGroup;
  isLoading = false; // Propiedad para controlar el estado de carga
  asistencias: EmpleadoAsistenciaPorFecha[] = [];

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiAsistenciaPorFechayEmpleadoService: ApiAsistenciaPorFechayEmpleadoService

  ) {
    console.log("Constructor");
    this.form = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      claveEmpleado: ['']
    });

    
  }

  private showLoading() {
    this.isLoading = true;
  }

  private hideLoading() {
    this.isLoading = false;
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.showLoading();
      try {
        const fechaInicio = this.form.value.fechaInicio;
        const fechaFin = this.form.value.fechaFin;
        const claveEmpleado = this.form.value.claveEmpleado;

        console.log("Fecha Inicio:", fechaInicio);
        console.log("Fecha Fin:", fechaFin);
        console.log("Clave Empleado:", claveEmpleado);

        this.apiAsistenciaPorFechayEmpleadoService.postAsistenciaPorFechas(fechaInicio, fechaFin, claveEmpleado)
          .subscribe(
            (response: EmpleadoAsistenciaPorFecha[]) => {
              console.log("Respuesta Datos:", response);
              this.asistencias = response;
              this.snackBar.open('Consulta exitosa.', 'Cerrar', {
                duration: 6000,
                panelClass: ['mat-success']
              });
            },
            (error) => {
              console.error("Error:", error);
              this.snackBar.open('Error al realizar la consulta.', 'Cerrar', {
                duration: 6000,
                panelClass: ['mat-warn']
              });
            }
          );

      } catch (error) {
        console.error("Error en onSubmit:", error);
        this.snackBar.open('Error inesperado. Por favor, intente nuevamente.', 'Cerrar', {
          duration: 6000,
          panelClass: ['mat-warn']
        });
      } finally {
        this.hideLoading();
      }
    } else {
      this.snackBar.open('El formulario no es válido.', 'Cerrar', {
        duration: 6000,
        panelClass: ['mat-warn']
      });
    }
  }

  get fechaInicio() {
    return this.form.get('fechaInicio');
  }

  get fechaFin() {
    return this.form.get('fechaFin');
  }


  openImage(url: string): void {
    console.log(url);
    // this.selectedImageUrl = url;
    // this.modal.openModal();
    window.open(url, '_blank', 'noopener,noreferrer');
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




}
