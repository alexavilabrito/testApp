import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import { IndicadorProvider } from '../../provider/indicador';
import {SerieModel} from "../../app/models/SerieModel";
import {Observable} from "rxjs/Observable";

@Component({
  selector : "page-itemDetails",
  templateUrl: 'itemdetails.html'
})
export class ItemDetailsPage {

  public serieList:Array<SerieModel>;


  constructor(public navCtrl: NavController , navParam : NavParams , indicador: IndicadorProvider ) {


    let item = navParam.get('item');

    /*
    indicador.handleData = this.handleData;
    indicador.handleComplete = this.handleComplete;
    indicador.handleError = this.handleError;
    indicador.getIndicadoresHandle( item );
    */

    indicador.getValorIndicador( item ).subscribe(
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

      },(exception) =>{
        console.log(exception)
      }
    );


  }



  handleData(result) {
    console.log('Here are the usable data', result);
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

    console.log( this.serieList );

  }

  handleComplete() {
    console.log('Complete');
  }

  handleError(error) {
    console.log('error:', error)
    return Observable.throw(error);
  }



}
