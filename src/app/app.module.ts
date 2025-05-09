import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Rutas
import { APP_ROUTING } from './app.routes';
//Servicios
import { AmigurumisService } from './servicios/amigurumis.service';

import { ReactiveFormsModule } from '@angular/forms';

//Componenetes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FechaComponent } from './components/fecha/fecha.component';
import { AmigurumiComponent } from './components/amigurumi/amigurumi.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AmigurumiTarjetaComponent } from './components/amigurumi-tarjeta/amigurumi-tarjeta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiActualizarCodigoLiberacionService } from './servicios/api-actualizar-codigo-liberacion-service.service';
import { FotoEmpleadoModalComponent } from './components/foto-empleado-modal/foto-empleado-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DiasHOComponent } from './components/diasHO/dias-ho/dias-ho.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FechaComponent,
    AmigurumiComponent,
    BuscadorComponent,
    AmigurumiTarjetaComponent,
    FotoEmpleadoModalComponent,
    DiasHOComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    HttpClientModule,
    FormsModule, // Agrega FormsModule aquí
    MatSnackBarModule,
    APP_ROUTING, BrowserAnimationsModule
  ],
  providers: [
    AmigurumisService,
    ApiActualizarCodigoLiberacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
