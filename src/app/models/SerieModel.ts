export class SerieModel {


  public fecha:string;
  public valor:number;

  getFechaFmt(){
    let d = new Date(this.fecha);
    var options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
    return d.toLocaleDateString('es-CL', options) ;
  }


  getValorFormateado(){
    return this.valor.toLocaleString('es-CL');
  }

}
