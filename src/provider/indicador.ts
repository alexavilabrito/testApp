import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class IndicadorProvider {

  urlService = "https://mindicador.cl/api"

  constructor( public http : HttpClient) {

  }

  getIndicadores() {
    //let headers = new HttpHeaders({"Accept":'application/json','Content-Type':'application/json'});
    return this.http.get( this.urlService );
  }

  getValorIndicador( indicador ){
    return this.http.get( this.urlService+'/'+indicador.codigo );
  }

}
