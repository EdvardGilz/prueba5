import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';

import { CommonFunctions } from '../../providers/common-functions';

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

  public diagnostico;
  public txt;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public commonFct: CommonFunctions) {
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
    else if (this.tipo == 2) {
      this.diagnostico = this.data.diagnostico;
      this.txt = this.data.txt.charAt(0).toUpperCase() + this.data.txt.slice(1);

      this.data.data.forEach(element => {

        var fecha1 = this.commonFct.cambiaFecha(element.PrimerTomaFecha.split(" ")[0]) + " del " + element.PrimerTomaFecha.split(" ")[0].split("/")[2];
        var hr1 = element.PrimerTomaFecha.split(" ")[1];
        var primerHora = this.commonFct.cambiaHorario(hr1.split(":")[0], hr1.split(":")[1], 0);
        element.PrimerTomaFechaMod1 = fecha1;
        element.PrimerTomaFechaMod2 = primerHora;

        var fecha2 = this.commonFct.cambiaFecha(element.UltimaTomaFecha.split(" ")[0]) + " del " + element.UltimaTomaFecha.split(" ")[0].split("/")[2];
        var hr2 = element.UltimaTomaFecha.split(" ")[1];
        var ultimaHora = this.commonFct.cambiaHorario(hr2.split(":")[0], hr2.split(":")[1], 0);
        element.UltimaTomaFechaMod1 = fecha2;
        element.UltimaTomaFechaMod2 = ultimaHora;

        var data = element.horarios;
        for (var i = 0; i < data.length; i++) {
          data[i] = this.commonFct.cambiaHorario(data[i].split(":")[0], data[i].split(":")[1], 0);
          
        }

      });
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
