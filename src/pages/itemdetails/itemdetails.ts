import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, Refresher} from "ionic-angular";
import IObserver = Interfaces.IObserver;
import {SerieProvider} from "../../provider/serie";

@Component({
  selector: "page-itemDetails",
  templateUrl: 'itemdetails.html'
})
export class ItemDetailsPage implements IObserver {

  private serieList = null;
  private item: any;
  private refresher: Refresher = null;
  private loading;

  constructor(public navCtrl: NavController, navParam: NavParams
    , public serie: SerieProvider, public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    this.item = navParam.get('item');
    this.serie.RegisterObserver(this);
    this.serie.getSerieIndicador(this.item);
  }

  doRefresh(refresher: Refresher) {
    this.serie.getSerieIndicador(this.item);
    this.refresher = refresher;
  }

  ReceiveNotification<Array>(dataArrived: Array): void {
    this.serieList = dataArrived;
    if (this.refresher != null) this.refresher.complete();
    this.loading.dismiss();
  }

  getDataTable() {
    return this.serieList;
  }

}
