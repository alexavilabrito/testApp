import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IndicadorProvider } from '../../provider/indicador';
import { SerieModel } from "../../app/models/SerieModel";
import {IndicadorModel} from "../../app/models/IndicadorModel";

@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html'
})
export class GraficoPage {

  public serieList:Array<SerieModel>;
  public lineChartData:Array<any> = [{data: [ ], label: ''}];

  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
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
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public item:IndicadorModel;

  constructor(public navCtrl: NavController , navParam : NavParams, public indicador: IndicadorProvider) {
    this.item = navParam.get('item');
    this.llenagrafico( this.item );
  }

  public llenagrafico( item ) : void {

    let _lineChartData:Array<any> = new Array(this.lineChartData.length);

    this.indicador.getValorIndicador_ext( item ).subscribe(
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
            if( a.fecha < b.fecha ) return -1;
            if( a.fecha > b.fecha ) return 1;
            return 0;
          }
        );


        _lineChartData[0] = {data: new Array(result['serie'].length), label: result['nombre']};
        let j=0;
        for( var serie in this.serieList ){
          _lineChartData[0].data[j++] = this.serieList[serie].valor;
          let d = new Date(this.serieList[serie].fecha);
          var options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
          this.lineChartLabels.push( d.toLocaleDateString('es-CL', options) );
        }


        this.lineChartData = _lineChartData;
      },(exception) =>{
        console.log(exception)
      }
    );



  }

// events
  public chartClicked(e:any):void {
    console.log(e);

  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
