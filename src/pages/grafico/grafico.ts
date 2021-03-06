import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IndicadorModel} from "../../app/models/IndicadorModel";
import IObserver = Interfaces.IObserver;
import {SerieProvider} from "../../provider/serie";

@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html'
})
export class GraficoPage implements IObserver {

  public serieList;
  public lineChartData: Array<any> = [{data: [], label: ''}];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public item: IndicadorModel;

  constructor(public navCtrl: NavController, navParam: NavParams, serie: SerieProvider) {
    this.item = navParam.get('item');
    serie.RegisterObserver(this);
    serie.getSerieIndicador(this.item);
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);

  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ReceiveNotification<Array>(dataArrived: Array): void {

    let _lineChartData = new Array(this.lineChartData.length);
    this.serieList = dataArrived;

    _lineChartData[0] = {data: new Array(this.serieList.length), label: this.item.codigo};

    let j = 0;
    for (var serie in this.serieList) {
      _lineChartData[0].data[j++] = this.serieList[serie].valor;
      let d = new Date(this.serieList[serie].fecha);
      var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
      this.lineChartLabels.push(d.toLocaleDateString('es-CL', options));
    }

    this.lineChartData = _lineChartData;

  }


}
