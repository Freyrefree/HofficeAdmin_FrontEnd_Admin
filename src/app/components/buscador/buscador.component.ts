import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmigurumisService } from 'src/app/servicios/amigurumis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
})
export class BuscadorComponent {

  amigurumis:any[] = [];
  termino:string = "";

  constructor(
    private activatedRoute:ActivatedRoute,
    private _amigurumisService:AmigurumisService, private _router:Router){
      

  }

  ngOnInit(){

    this.activatedRoute.params.subscribe(params =>{
      // console.log(params['termino']);
      this.termino = params['termino'];
      console.log(this.amigurumis)
    })

  }



}
