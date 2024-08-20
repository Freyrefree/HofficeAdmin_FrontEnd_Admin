import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmigurumisService } from 'src/app/servicios/amigurumis.service';

@Component({
  selector: 'app-amigurumi',
  templateUrl: './amigurumi.component.html',
})
export class AmigurumiComponent {

  amigurumi:any = {};


  constructor(
    private _activatedRouter:ActivatedRoute,
    private _amigurumisService:AmigurumisService
  ){
    this._activatedRouter.params.subscribe(parametros => {
      // console.log(parametros);

    })
  }
}
