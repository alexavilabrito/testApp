/*

 */
export class IndicadorModel{
  public codigo:string;
  public nombre:string;
  public unidad_medida:string;
  public fecha:string;
  public valor:number;



  getValorFormateado(){
    return this.valor.toLocaleString('es-CL');
  }
}
