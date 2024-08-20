import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FechaComponent } from './components/fecha/fecha.component';
import { DiasHOComponent } from './components/diasHO/dias-ho/dias-ho.component';


const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'fechas', component: FechaComponent},
    {path: 'dias', component: DiasHOComponent},
    {path: '**',pathMatch: 'full', redirectTo: 'home'}

];

export const  APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

