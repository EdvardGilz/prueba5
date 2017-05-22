import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';

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
              public viewCtrl: ViewController,
              public alertCtrl: AlertController) {
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

  modificar(data) {
    var val;
    if (this.tipo == 0) {
      val = this.obsP;
    }
    else {
      val = this.obsG;
    }
    let prompt = this.alertCtrl.create({
      title: "Modificar las observaciones",
      inputs: [
        {
          name: "obs",
          value: val
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Actualizar",
          handler: data => {
            this.data.obs = data.obs;
            this.obsP = data.obs;
            this.obsG = data.obs;
          }
        }
      ]
    });
    prompt.present();
  }

  volver() {
    this.viewCtrl.dismiss();
  }

}
