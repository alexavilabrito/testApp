import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import IObserver = Interfaces.IObserver;
import {SerieProvider} from "../../provider/serie";

@Component({
  selector : "page-itemDetails",
  templateUrl: 'itemdetails.html'
})
export class ItemDetailsPage implements IObserver{

  public serieList;


  constructor(public navCtrl: NavController , navParam : NavParams , serie: SerieProvider ) {

    let item = navParam.get('item');
    serie.RegisterObserver( this );
    serie.getSerieIndicador( item );

  }


  ReceiveNotification<Array>(dataArrived: Array): void {
    this.serieList = dataArrived;
  }


}
