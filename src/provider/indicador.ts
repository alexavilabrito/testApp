import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SerieModel} from "../app/models/SerieModel";
import {IndicadorModel} from "../app/models/IndicadorModel";
import IObservable = Interfaces.IObservable;
import IObserver = Interfaces.IObserver;

@Injectable()
export class IndicadorProvider implements IObservable
{

  private urlService = "https://mindicador.cl/api";

  private _observer: IObserver[];

  private indicadorList:Array<IndicadorModel>;

  constructor( public http : HttpClient  ) {

    this._observer = [];

  }


  RegisterObserver(theObserver: Interfaces.IObserver) {
    this._observer.push( theObserver );
  }


  RemoveObserver(theObserver: Interfaces.IObserver) {
    for( let i=0 ; i < this._observer.length ; i++ ){
      if( this._observer[i] === theObserver ){
        this._observer.splice( i , 1 );
      }
    }
  }


  NotifyObservers(  ) {
    for( let i=0 ; i < this._observer.length ; i++ ) {
      this._observer[i].ReceiveNotification( this.indicadorList );
    }
  }




  getIndicadores(  ) {
    return this.http.get( this.urlService ).subscribe(
      (result)=>{
        this.indicadorList = new Array<IndicadorModel>();
        for(var k in result) {
          if( k != 'version' && k != 'autor' && k != 'fecha' ) {
            //console.log(k, result[k]);
            let indicador = new IndicadorModel();
            indicador.codigo = result[k]['codigo'];
            indicador.nombre = result[k]['nombre'];
            indicador.unidad_medida = result[k]['unidad_medida'];
            indicador.valor = result[k]['valor'];
            this.indicadorList.push( indicador );
          }
        }
        //console.log( this.indicadorList );

        this.indicadorList = this.indicadorList.sort(
          (a,b):number => {
            if( a.nombre < b.nombre ) return -1;
            if( a.nombre > b.nombre ) return 1;
            return 0;
          }
        );

        this.NotifyObservers();

      },(exception)=>{
        console.log(exception);
      }
    );
  }



  getValorIndicador_ext( indicador  ){
    return this.http.get( this.urlService+'/'+indicador.codigo )
  }


}
