import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IndicadorProvider } from '../../provider/indicador';
import {ItemDetailsPage} from "../itemdetails/itemdetails";
import {GraficoPage} from "../grafico/grafico";
import IObserver = Interfaces.IObserver;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements IObserver{

  private _myId: number;
  static NextClientId: number = 0;

  private indicadorList;

  constructor(public navCtrl: NavController , indicador: IndicadorProvider ) {

    indicador.RegisterObserver( this );
    this._myId = HomePage.NextClientId++;

    indicador.getIndicadores();

  }

  getIndicadores(){
    return this.indicadorList;
  }


  itemTapped(item) {
    this.navCtrl.push( ItemDetailsPage , { item } );
  }


  itemTappedGrafico(item) {
    this.navCtrl.push( GraficoPage , { item } );
  }


  ReceiveNotification <Array>(dataArrived: Array ): void {
    this.indicadorList = dataArrived;
  }


}
