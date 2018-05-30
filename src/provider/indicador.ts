import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SerieModel} from "../app/models/SerieModel";

@Injectable()
export class IndicadorProvider
{

  private urlService = "https://mindicador.cl/api";
  private serieList:Array<SerieModel>;

  public handleData:any;
  public handleError:any;
  public handleComplete:any;

  constructor( public http : HttpClient) { }

  getIndicadores(  ) {
     return this.http.get( this.urlService );
  }


  getIndicadoresHandle( indicador ) {
    this.http.get( this.urlService + '/' + indicador.codigo )
      .subscribe( this.handleData , this.handleError , this.handleComplete );
  }


  geObserveIndicador(  ) {
    this.http.get( this.urlService )
      .subscribe(
        (result)=>{
          console.log(result);
          this.serieList = new Array<SerieModel>();
          for(var k in result['serie']) {
            //console.log( result['serie'][k] );
            let serie = new SerieModel();

            serie.fecha = result['serie'][k].fecha;
            serie.valor = result['serie'][k].valor;
            this.serieList.push( serie );
          }

          this.serieList = this.serieList.sort(
            (a,b):number => {
              if( a.fecha < b.fecha ) return 1;
              if( a.fecha > b.fecha ) return -1;
              return 0;
            }
          );
        },(exception) =>{
          console.log(exception)
        }
      );
  }


  getValorIndicador( indicador  ){
    return this.http.get( this.urlService+'/'+indicador.codigo )
  }

  getValorIndicador_ext( indicador  ){
    return this.http.get( this.urlService+'/'+indicador.codigo )
  }



}
