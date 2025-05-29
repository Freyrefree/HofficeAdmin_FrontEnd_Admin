import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Reportes
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-js-style';


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
      this.isLoading = true;
      try {
        const fechaInicio = this.form.value.fechaInicio;
        const fechaFin = this.form.value.fechaFin;
        const claveEmpleado = this.form.value.claveEmpleado;

        this.apiAsistenciaPorFechayEmpleadoService.postReportePorFechas(fechaInicio, fechaFin, claveEmpleado)
          .subscribe(
            (response: EmpleadoAsistenciaPorFecha[]) => {
              this.dataPDF = response;
              const doc = new jsPDF('landscape');
              const fechaColumnas: string[] = [];
              const tableData: any[] = [];

              // Construir las columnas de fechas con formato YYYY/MM/DD
              this.dataPDF.forEach(empleado => {
                empleado.fechas.forEach(fecha => {
                  const fechaFormatted = new Date(fecha.fecha);
                  const formatted = `${fechaFormatted.getFullYear()}/${('0' + (fechaFormatted.getMonth() + 1)).slice(-2)}/${('0' + fechaFormatted.getDate()).slice(-2)}`;
                  if (!fechaColumnas.includes(formatted)) {
                    fechaColumnas.push(formatted);
                  }
                });
              });

              // Construir las filas de la tabla
              this.dataPDF.forEach(empleado => {
                const row: any = {
                  claveEmpleado: empleado.claveEmpleado,
                  nombreCompleto: empleado.nombreCompleto
                };

                fechaColumnas.forEach(fechaCol => {
                  const fecha = empleado.fechas.find(f => {
                    const fDate = new Date(f.fecha);
                    const formatted = `${fDate.getFullYear()}/${('0' + (fDate.getMonth() + 1)).slice(-2)}/${('0' + fDate.getDate()).slice(-2)}`;
                    return formatted === fechaCol;
                  });
                  if (fecha?.diaHO) {
                    if (fecha && fecha.accesos.length > 1) {
                      row[fechaCol] = 'A';
                    } else {
                      row[fechaCol] = 'F Accesos Incompletos';
                    }
                  } else {
                    row[fechaCol] = 'No aplica HO';
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

              // Generar la tabla en el PDF con márgenes estrechos
              (doc as any).autoTable({
                head: [columns.map(col => col.header)],
                body: tableData.map(row => columns.map(col => row[col.dataKey] || '')),
                startY: 10,
                margin: { top: 10, right: 10, bottom: 10, left: 10 },
                styles: { fontSize: 8 },
                theme: 'grid'
              });

              // Guardar el PDF
              doc.save('Asistencia.pdf');
              this.isLoading = false;
            },
            (error) => {
              console.error("Error:", error);
              this.snackBar.open('Error al realizar la consulta.', 'Cerrar', {
                duration: 6000,
                panelClass: ['mat-warn']
              });
              this.isLoading = false;
            }
          );
      } catch (error) {
        console.error("Error en onSubmit:", error);
        this.snackBar.open('Error inesperado. Por favor, intente nuevamente.', 'Cerrar', {
          duration: 6000,
          panelClass: ['mat-warn']
        });
        this.isLoading = false;
      }
    } else {
      this.snackBar.open('El formulario no es válido.', 'Cerrar', {
        duration: 6000,
        panelClass: ['mat-warn']
      });
    }
  }



  // Nueva función para descargar Excel
  descargarExcel(): void {
  if (this.form.valid) {
    this.isLoading = true;
    const fechaInicio = this.form.value.fechaInicio;
    const fechaFin = this.form.value.fechaFin;
    const claveEmpleado = this.form.value.claveEmpleado;

    this.apiAsistenciaPorFechayEmpleadoService.postReportePorFechas(fechaInicio, fechaFin, claveEmpleado)
      .subscribe(
        (response: EmpleadoAsistenciaPorFecha[]) => {
          // Procesar los datos para Excel
          const fechaColumnas: string[] = [];
          const tableData: any[] = [];

          // Construir las columnas de fechas con formato YYYY/MM/DD
          response.forEach(empleado => {
            empleado.fechas.forEach(fecha => {
              const fechaFormatted = new Date(fecha.fecha);
              const formatted = `${fechaFormatted.getFullYear()}/${('0' + (fechaFormatted.getMonth() + 1)).slice(-2)}/${('0' + fechaFormatted.getDate()).slice(-2)}`;
              if (!fechaColumnas.includes(formatted)) {
                fechaColumnas.push(formatted);
              }
            });
          });

          // Construir las filas de la tabla con estilos
          response.forEach(empleado => {
            const row: any = {
              'Clave Empleado': { v: empleado.claveEmpleado, t: 's', s: { font: { bold: true } } },
              'Nombre Completo': { v: empleado.nombreCompleto, t: 's', s: { font: { bold: true } } }
            };

            fechaColumnas.forEach(fechaCol => {
              // Buscar la fecha original que corresponde al formato YYYY/MM/DD
              const fecha = empleado.fechas.find(f => {
                const fDate = new Date(f.fecha);
                const formatted = `${fDate.getFullYear()}/${('0' + (fDate.getMonth() + 1)).slice(-2)}/${('0' + fDate.getDate()).slice(-2)}`;
                return formatted === fechaCol;
              });
              let valor = '';
              let estilo = {};
              
              if (fecha?.diaHO) {
                if (fecha && fecha.accesos.length > 1) {
                  valor = 'A';
                  estilo = { fill: { fgColor: { rgb: "FF00FF00" } } }; // Verde
                } else {
                  valor = 'F Accesos Incompletos';
                  estilo = { fill: { fgColor: { rgb: "FFFF0000" } } }; // Rojo
                }
              } else {
                valor = 'No aplica HO';
                estilo = { fill: { fgColor: { rgb: "FFFFFF00" } } }; // Amarillo
              }
              
              row[fechaCol] = { v: valor, t: 's', s: estilo };
            });

            tableData.push(row);
          });

          // Crear encabezados con estilo
          const headers = [
            { v: 'Clave Empleado', t: 's', s: { font: { bold: true, color: { rgb: "FFFFFFFF" } }, fill: { fgColor: { rgb: "FF4472C4" } } } },
            { v: 'Nombre Completo', t: 's', s: { font: { bold: true, color: { rgb: "FFFFFFFF" } }, fill: { fgColor: { rgb: "FF4472C4" } } } },
            ...fechaColumnas.map(fecha => ({
              v: fecha, 
              t: 's', 
              s: { font: { bold: true, color: { rgb: "FFFFFFFF" } }, fill: { fgColor: { rgb: "FF4472C4" } } }
            }))
          ];

          // Crear hoja de cálculo
          const ws = XLSX.utils.json_to_sheet([], { skipHeader: true });
          
          // Agregar encabezados
          XLSX.utils.sheet_add_aoa(ws, [headers.map(h => h.v)], { origin: 'A1' });
          
          // Aplicar estilos a los encabezados
          headers.forEach((header, index) => {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
            ws[cellRef] = header;
          });
          
          // Agregar datos
          tableData.forEach((row, rowIndex) => {
            const rowData = [
              row['Clave Empleado'].v,
              row['Nombre Completo'].v,
              ...fechaColumnas.map(fecha => row[fecha].v)
            ];
            XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: XLSX.utils.encode_cell({ r: rowIndex + 1, c: 0 }) });
            
            // Aplicar estilos a las celdas
            Object.keys(row).forEach((key, colIndex) => {
              const cellRef = XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex });
              ws[cellRef] = row[key];
            });
          });

          // Ajustar el ancho de las columnas
          ws['!cols'] = [
            { wch: 15 }, // Clave Empleado
            { wch: 30 }, // Nombre Completo
            ...fechaColumnas.map(() => ({ wch: 20 })) // Fechas
          ];

          // Crear libro de trabajo
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Asistencia");

          // Generar el archivo Excel
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
          FileSaver.saveAs(data, 'Asistencia.xlsx');
          this.isLoading = false;
        },
        (error) => {
          console.error("Error:", error);
          this.snackBar.open('Error al generar el Excel.', 'Cerrar', {
            duration: 6000,
            panelClass: ['mat-warn']
          });
          this.isLoading = false;
        }
      );
  } else {
    this.snackBar.open('El formulario no es válido.', 'Cerrar', {
      duration: 6000,
      panelClass: ['mat-warn']
    });
  }
}





}
