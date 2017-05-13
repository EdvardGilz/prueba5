import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Detalle } from '../detalle/detalle';

import { CommonFunctions } from '../../providers/common-functions';

/**
 * Generated class for the Presion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-presion',
  templateUrl: 'presion.html',
})
export class Presion {
  valoresPres = [];
  vacio = 1;

  constructor(public alertCtrl: AlertController,
              public storage: Storage,
              public modalCtrl: ModalController,
              public commonFct: CommonFunctions) {
  }

  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get("presionData").then((data) => {
        if (data != null) {
          this.valoresPres = data;
          this.vacio = 0;
        }
        else {
          this.vacio = 1;
        }
      });
    });
  }

  nuevaMedicion() {
    let prompt = this.alertCtrl.create({
      title: "Nueva Medicion",
      message: "Ingresa los valores obtenidos",
      inputs: [
        {
          type: "number",
          name: "sys",
          placeholder: "Sistole (valor más grande)"
        },
        {
          type: "number",
          name: "dia",
          placeholder: "Diastole (valor más pequeño)"
        },
        {
          type: "number",
          name: "puls",
          placeholder: "Pulsaciones"
        },
        {
          type: "text",
          name: "obs",
          placeholder: "Observaciones"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Guardar",
          handler: data => {
            var fecha = this.commonFct.getDate();
            data.fecha = fecha;

            if (data.sys != "" && data.dia != "") {
              if (data.sys >= 140 || data.dia >= 90) {
                this.alerta();
              }
              this.storage.get("presionData").then((res) => {
                if (res != null) {
                  this.valoresPres = res;
                  this.valoresPres.unshift(data);
                  this.storage.set("presionData", this.valoresPres);
                }
                else {
                  this.valoresPres.unshift(data);
                  this.storage.set("presionData", this.valoresPres);
                }
              });
            }
            this.vacio = 0;
          }
        }
      ]
    });

    prompt.present();
  }

  alerta() {
    let alert = this.alertCtrl.create({
      title: "Cuidado, presión alta!",
      subTitle: "Riego de hipertension",
      message: "Tu presión es muy alta, te recomendamos acudir con tu doctor.",
      buttons: [
        {
          text: "Aceptar"
        }
      ]
    });

    alert.present();
  }

  detalle(data) {
    let modal = this.modalCtrl.create(Detalle, {data: data, tipo: 0});
    modal.present();
  }

  eliminar() {
    this.storage.remove("presionData");
    this.valoresPres = [];
    this.vacio = 1;
  }

}
