import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import { IndicadorProvider } from '../../provider/indicador';
import {SerieModel} from "../../app/models/SerieModel";
import NumberFormat = Intl.NumberFormat;

@Component({
  selector : "page-itemDetails",
  templateUrl: 'itemdetails.html'
})
export class ItemDetailsPage {

  public serieList:Array<SerieModel>;

  public fecha = {
   // weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
   // hour: '2-digit',
   // minute: '2-digit'
  };


  public fechaHora = {
    // weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };


  constructor(public navCtrl: NavController , navParam : NavParams , indicador: IndicadorProvider ) {

    let item = navParam.get('item');

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

  formatNumber( valor ){
    console.log( NumberFormat( valor ) );
    return '$ ' + valor;
  }

  formatDate( valor ){
    let fecha = new Date( valor );
    return fecha.toLocaleString('es-cl' , this.fecha );
  }

}
