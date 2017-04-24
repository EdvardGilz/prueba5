import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
              public storage: Storage) {
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
            var fecha = this.getDateVal();
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

  eliminar() {
    this.storage.remove("glucosaData");
    this.valoresGlu = [];
    this.vacio = 1;
  }

}
