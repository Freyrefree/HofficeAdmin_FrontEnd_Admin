import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

//servicios
import { ApiAsistenciaPorFechayEmpleadoService } from 'src/app/servicios/api-asistencia-por-fechay-empleado.service';

//interfaces
import { EmpleadoAsistenciaPorFecha } from 'src/app/Interfaces/Data';

// Alertas
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-amigurumis',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css'] // Añadir el archivo de estilos si es necesario
})
export class FechaComponent implements OnInit {
  form: FormGroup;
  asistencias: EmpleadoAsistenciaPorFecha[] = [];
  dataPDF: EmpleadoAsistenciaPorFecha[] = [];
  isLoading = false;



  constructor(
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




  ngOnInit() {
    console.log("ngOnInit");
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true; // Muestra el loading
  
      const fechaInicio = this.form.value.fechaInicio;
      const fechaFin = this.form.value.fechaFin;
      const claveEmpleado = this.form.value.claveEmpleado;
  
      this.apiAsistenciaPorFechayEmpleadoService.postAsistenciaPorFechas(fechaInicio, fechaFin, claveEmpleado)
        .subscribe(
          (response: EmpleadoAsistenciaPorFecha[]) => {
            this.asistencias = response;
            this.snackBar.open('Consulta exitosa.', 'Cerrar', { duration: 6000, panelClass: ['mat-success'] });
            this.isLoading = false; // Oculta el loading
          },
          (error) => {
            console.error("Error:", error);
            this.snackBar.open('Error al realizar la consulta.', 'Cerrar', { duration: 6000, panelClass: ['mat-warn'] });
            this.isLoading = false;
          }
        );
    } else {
      this.snackBar.open('El formulario no es válido.', 'Cerrar', { duration: 6000, panelClass: ['mat-warn'] });
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

   // Nueva función para descargar PDF
   descargarPDF(): void {
    if (this.form.valid) {
      try {
        const fechaInicio = this.form.value.fechaInicio;
        const fechaFin = this.form.value.fechaFin;
        const claveEmpleado = this.form.value.claveEmpleado;

        //*****************************************************


    this.apiAsistenciaPorFechayEmpleadoService.postReportePorFechas(fechaInicio, fechaFin, claveEmpleado)
  .subscribe(
    (response: EmpleadoAsistenciaPorFecha[]) => {
      this.dataPDF = response;
      console.log(this.dataPDF);

      const doc = new jsPDF('landscape');
      const fechaColumnas: string[] = [];
      const tableData: any[] = [];

      // Construir las columnas de fechas
      this.dataPDF.forEach(empleado => {
        empleado.fechas.forEach(fecha => {
          const fechaFormatted = new Date(fecha.fecha).toLocaleDateString();
          if (!fechaColumnas.includes(fechaFormatted)) {
            fechaColumnas.push(fechaFormatted);
          }
        });
      });

      // Construir las filas de la tabla
      this.dataPDF.forEach(empleado => {
        const row: any = {
          claveEmpleado: empleado.claveEmpleado,
          nombreCompleto: empleado.nombreCompleto
        };

        // Agregar "A" en las columnas correspondientes si hay al menos un acceso
        fechaColumnas.forEach(fechaCol => {
          const fecha = empleado.fechas.find(f => new Date(f.fecha).toLocaleDateString() === fechaCol);
          if(fecha?.diaHO){

            if (fecha && fecha.accesos.length > 1) {
              row[fechaCol] = 'A';
            }else{
              row[fechaCol] = 'F Accesos Incompletos';
            }

          }else{
            row[fechaCol] ='No aplica HO';
          }

        });

        tableData.push(row);
      });

      // Configurar columnas de la tabla
      const columns = [
        { header: 'Clave Empleado', dataKey: 'claveEmpleado' },
        { header: 'Nombre Completo', dataKey: 'nombreCompleto' },
        ...fechaColumnas.map(fecha => ({ header: fecha, dataKey: fecha }))
      ];

      // // Generar la tabla en el PDF
      // (doc as any).autoTable({
      //   head: [columns.map(col => col.header)],
      //   body: tableData.map(row => columns.map(col => row[col.dataKey] || '')),
      //   startY: 10,
      //   margin: { top: 10 },
      //   styles: { fontSize: 8 },
      //   theme: 'grid'
      // });
            // Generar la tabla en el PDF con márgenes estrechos
            (doc as any).autoTable({
              head: [columns.map(col => col.header)],
              body: tableData.map(row => columns.map(col => row[col.dataKey] || '')),
              startY: 10, // Esto define el margen superior
              margin: { top: 10, right: 10, bottom: 10, left: 10 }, // Márgenes estrechos
              styles: { fontSize: 8 },
              theme: 'grid'
            });

      // Guardar el PDF
      doc.save('Asistencia.pdf');
    },
    (error) => {
      console.error("Error:", error);
      this.snackBar.open('Error al realizar la consulta.', 'Cerrar', {
        duration: 6000,
        panelClass: ['mat-warn']
      });
    }
  );

  //**********************************************************************


      

      } catch (error) {
        console.error("Error en onSubmit:", error);
        this.snackBar.open('Error inesperado. Por favor, intente nuevamente.', 'Cerrar', {
          duration: 6000,
          panelClass: ['mat-warn']
        });
      } finally {
      }
    } else {
      this.snackBar.open('El formulario no es válido.', 'Cerrar', {
        duration: 6000,
        panelClass: ['mat-warn']
      });
    }
  }





}
