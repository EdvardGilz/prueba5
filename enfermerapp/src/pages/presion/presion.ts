import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Presion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-presion',
  templateUrl: 'presion.html'
})
export class PresionPage {
  valoresPres = [];
  vacio = 1;

  constructor(public alertCtrl: AlertController,
              public storage: Storage) {
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

  getDateVal() {
    var now = new Date();
    var diaVal = now.getDate();
    var dia;
    var mesVal = now.getMonth() +1;
    var mes;
    var horaVal = now.getHours();
    var hora;
    var minutosVal = now.getMinutes();
    var minutos
    var anio = now.getFullYear();

    if (diaVal <= 9) {
      dia = "0" + diaVal;
    }
    else {
      dia = diaVal;
    }
    if (mesVal <= 9) {
      mes = "0" + mesVal;
    }
    else {
      mes = mesVal;
    }
    if (horaVal <= 9) {
      hora = "0" + horaVal;
    }
    else {
      hora = horaVal;
    }
    if (minutosVal <= 9) {
      minutos = "0" + minutosVal;
    }
    else {
      minutos = minutosVal;
    }

    return dia + "/" + mes + "/" + anio + " " + hora + ":" + minutos;
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
            var fecha = this.getDateVal();
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

  eliminar() {
    this.storage.remove("presionData");
    this.valoresPres = [];
    this.vacio = 1;
  }

}
