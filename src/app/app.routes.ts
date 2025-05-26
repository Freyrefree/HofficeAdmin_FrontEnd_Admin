import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FechaComponent } from './components/fecha/fecha.component';
import { DiasHOComponent } from './components/diasHO/dias-ho/dias-ho.component';
import { authGuard } from './Guard/auth.guard';
import { UnauthorizedComponent } from './components/Unauthorized/unauthorized/unauthorized.component';



const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [

        { path: 'home',
        component: HomeComponent,
        data: { requiredModule: 'home' }
        },
        { path: 'fechas',
            component: FechaComponent,
            data: { requiredModule: 'fechas' }
        },
        { path: 'dias',
            component: DiasHOComponent,
            data: { requiredModule: 'dias' }
        },
        { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
