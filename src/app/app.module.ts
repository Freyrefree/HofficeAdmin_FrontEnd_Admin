import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes'; // Asegúrate de que la ruta sea correcta

//Rutas

//Servicios

import { ReactiveFormsModule } from '@angular/forms';

//Componenetes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FechaComponent } from './components/fecha/fecha.component';
import { EmpleadoTarjetaComponent } from './components/empleado-tarjeta/empleado-tarjeta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DiasHOComponent } from './components/diasHO/dias-ho/dias-ho.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { UnauthorizedComponent } from './components/Unauthorized/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FechaComponent,
    EmpleadoTarjetaComponent,
    DiasHOComponent,
    LoadingComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]), // Importa RouterModule
    AppRoutingModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    HttpClientModule,
    FormsModule, // Agrega FormsModule aquí
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
