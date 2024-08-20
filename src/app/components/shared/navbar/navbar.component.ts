import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  constructor(private router:Router ){}

  ngOnInit(){

  }

  buscarAmigurumi(termino:string){
    // console.log(termino);
    this.router.navigate(['/buscar',termino]);
  }

}
