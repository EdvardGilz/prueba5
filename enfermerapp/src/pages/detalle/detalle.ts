import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Detalle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class Detalle {
  public data;
  public tipo;

  public sys;
  public dia;
  public puls;
  public obsP;
  public fecha;

  public glucosa;
  public obsG;
  public ayunas;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.data = navParams.get('data');
    this.tipo = navParams.get('tipo');

    if (this.tipo == 0) {
      this.sys = this.data.sys;
      this.dia = this.data.dia;
      this.puls = this.data.puls;
      this.obsP = this.data.obs;
      this.fecha = this.data.fecha;
    }
    else if (this.tipo == 1) {
      this.glucosa = this.data.glucosa;
      this.ayunas = this.data.ayunas;
      this.obsG = this.data.obs;
      this.fecha = this.data.fecha;
    }
  }

  volver() {
    this.viewCtrl.dismiss();
  }

}
