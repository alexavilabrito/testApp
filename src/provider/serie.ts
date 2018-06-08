import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SerieModel} from "../app/models/SerieModel";
import IObservable = Interfaces.IObservable;
import IObserver = Interfaces.IObserver;

@Injectable()
export class SerieProvider implements IObservable
{

  private urlService = "https://mindicador.cl/api";

  private _observer: IObserver[];

  private serieList:Array<SerieModel>;

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
      this._observer[i].ReceiveNotification( this.serieList );
    }
  }





  getSerieIndicador( indicador  ){
    return this.http.get( this.urlService+'/'+indicador.codigo ).subscribe(
      (result)=>{
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

        this.NotifyObservers();

      },(exception) =>{
        console.log(exception)
      }
    );

  }



}
