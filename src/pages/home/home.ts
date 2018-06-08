import { Component } from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import { IndicadorProvider } from '../../provider/indicador';
import {ItemDetailsPage} from "../itemdetails/itemdetails";
import {GraficoPage} from "../grafico/grafico";
import IObserver = Interfaces.IObserver;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements IObserver{



  private indicadorList;
  private indicador:IndicadorProvider;
  private refresher: Refresher = null;

  constructor(public navCtrl: NavController , indicador: IndicadorProvider ) {
    indicador.RegisterObserver( this );
    this.indicador = indicador;
    this.indicador.getIndicadores();
  }

  doRefresh(refresher: Refresher) {
    this.indicador.getIndicadores();
    this.refresher=refresher;
  }
  itemTapped(item) {
    this.navCtrl.push( ItemDetailsPage , { item } );
  }

  itemTappedGrafico(item) {
    this.navCtrl.push( GraficoPage , { item } );
  }

  getDataTable(){
    return this.indicadorList;
  }

  ReceiveNotification <Array> (dataArrived: Array ) : void {
    this.indicadorList = dataArrived;
    if( this.refresher != null ) this.refresher.complete();
  }

}
