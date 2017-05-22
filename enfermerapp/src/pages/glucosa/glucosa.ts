import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Detalle } from '../detalle/detalle';

import { CommonFunctions } from '../../providers/common-functions';

/**
 * Generated class for the Glucosa page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-glucosa',
  templateUrl: 'glucosa.html',
})
export class Glucosa {
  valoresGlu = [];
  vacio = 1;

  constructor(public alertCtrl: AlertController,
              public storage: Storage,
              public modalCtrl: ModalController,
              public commonFct: CommonFunctions) {
  }

  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get("glucosaData").then((data) => {
        if (data != null) {
          this.valoresGlu = data;
          this.vacio = 0;
        }
        else {
          this.vacio = 1;
        }
      });
    });
  }

  nuevaMedicion(val) {
    var titulo;

    if (val == 0) {
      titulo = "Medición en ayunas";
    }
    else {
      titulo = "Medición después de comer";
    }

    let prompt = this.alertCtrl.create({
      title: titulo,
      message: "Ingresa los valores obtenidos",
      inputs: [
        {
          type: "number",
          name: "glucosa",
          placeholder: "Nivel de glucosa"
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
            if (val == 0) {
              data.ayunas = "En ayunas";
            }
            else if (val == 1) {
              data.ayunas = "Después de comer";
            }

            if (data.glucosa != "") {
              if (val == 0) {
                if (data.glucosa > 100 && data.glucosa < 126) {
                  // ALERTA MODERADA
                  this.alerta(0);
                }
                if (data.glucosa >= 126) {
                  // ALERTA ALTA
                  this.alerta(1);
                }
              }
              else if (val == 1) {
                if (data.glucosa > 140 && data.glucosa < 200) {
                  // ALERTA MODERADA
                  this.alerta(0);
                }
                if (data.glucosa >= 200) {
                  // ALERTA ALTA
                  this.alerta(1);
                }
              }

              this.storage.get("glucosaData").then((res) => {
                if (res != null) {
                  this.valoresGlu = res;
                  this.valoresGlu.unshift(data);
                  this.storage.set("glucosaData", this.valoresGlu);
                }
                else {
                  this.valoresGlu.unshift(data);
                  this.storage.set("glucosaData", this.valoresGlu);
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

  alerta(val) {
    var titulo;
    var subTitulo;
    var mensaje;

    if (val == 0) {
      titulo = "Cuida tu azucar";
      subTitulo = "Niveles un poco altos";
      mensaje = "Tus niveles de azucar están moderadamente altos, te recomendamos acudir con tu doctor.";
    }
    else if (val == 1) {
      titulo = "Cuida tu azucar";
      subTitulo = "Niveles muy altos";
      mensaje = "Tus niveles de azucar están peligrosamente altos, te recomendamos acudir con tu doctor.";
    }

    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subTitulo,
      message: mensaje,
      buttons: [
        {
          text: "Aceptar"
        }
      ]
    });

    alert.present();
  }

  detalle(data) {
    let modal = this.modalCtrl.create(Detalle, {data: data, tipo: 1});
    modal.onDidDismiss(data => {
      this.storage.set("glucosaData", this.valoresGlu);
    });
    modal.present();
  }

  eliminar() {
    this.storage.remove("glucosaData");
    this.valoresGlu = [];
    this.vacio = 1;
  }

}
