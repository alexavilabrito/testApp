import { Component } from '@angular/core';
import {NavController, NavParams, Refresher} from "ionic-angular";
import IObserver = Interfaces.IObserver;
import {SerieProvider} from "../../provider/serie";

@Component({
  selector : "page-itemDetails",
  templateUrl: 'itemdetails.html'
})
export class ItemDetailsPage implements IObserver{

  private serieList = null;
  private serie: SerieProvider;
  private item: any;
  private refresher: Refresher = null;

  constructor(public navCtrl: NavController , navParam : NavParams , serie: SerieProvider ) {
    this.item = navParam.get('item');
    this.serie = serie;
    this.serie.RegisterObserver( this );
    this.serie.getSerieIndicador( this.item );
   }

  doRefresh(refresher: Refresher) {
    this.serie.getSerieIndicador( this.item );
    this.refresher=refresher;
  }

  ReceiveNotification<Array>(dataArrived: Array): void {
    this.serieList = dataArrived;
    if( this.refresher != null ) this.refresher.complete();
   }

   getDataTable(){
    return this.serieList;
   }

}
