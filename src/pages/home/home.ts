import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IndicadorProvider } from '../../provider/indicador';
import { IndicadorModel } from "../../app/models/IndicadorModel";
import {ItemDetailsPage} from "../itemdetails/itemdetails";
import {GraficoPage} from "../grafico/grafico";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public indicadorList:Array<IndicadorModel>;

  constructor(public navCtrl: NavController , indicador: IndicadorProvider ) {


    indicador.getIndicadores( ).subscribe(
        (result)=>{
          this.indicadorList = new Array<IndicadorModel>();
          for(var k in result) {
            if( k != 'version' && k != 'autor' && k != 'fecha' ) {
              //console.log(k, result[k]);
              let indicador = new IndicadorModel();
              indicador.codigo = result[k]['codigo'];
              indicador.nombre = result[k]['nombre'];
              indicador.unidad_medida = result[k]['unidad_medida'];
              indicador.valor = result[k]['valor'];
              this.indicadorList.push( indicador );
            }
          }
          //console.log( this.indicadorList );

          this.indicadorList = this.indicadorList.sort(
            (a,b):number => {
              if( a.nombre < b.nombre ) return -1;
              if( a.nombre > b.nombre ) return 1;
              return 0;
            }
          );

        },(exception)=>{
          console.log(exception);
        }
    );



  }



  itemTapped(item) {
    this.navCtrl.push( ItemDetailsPage , { item } );
  }


  itemTappedGrafico(item) {
    this.navCtrl.push( GraficoPage , { item } );
  }


}
