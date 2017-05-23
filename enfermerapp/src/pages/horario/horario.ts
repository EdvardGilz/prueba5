import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CommonFunctions } from '../../providers/common-functions';

import { Recordatorio } from '../recordatorio/recordatorio';
import { Detalle } from '../detalle/detalle';

/**
 * Generated class for the Horario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-horario',
  templateUrl: 'horario.html',
})
export class Horario {
  public medicamentos = [];
  public vacio = 1;
  public fecha;

  constructor(public modalCtrl: ModalController,
              public storage: Storage,
              private alertCtrl: AlertController,
              public commonFct: CommonFunctions) {
    
  }

  ionViewWillEnter() {
    this.verificar();
  }

  verificar() {
    this.storage.ready().then(() => {
      this.storage.get("horario").then((data) => {
        if (data != null) {
          this.medicamentos = data;
          this.vacio = 0;
        }
        else {
          this.vacio = 1;
        }
      }).then(() => {
        this.medicamentos.forEach(element => {
          element.data.forEach(element2 => {
            var res = this.commonFct.compararFecha(element2.UltimaTomaFecha);
            if (res == false) {
              element2.activo = 0;
            }
          });
        });
      });
    });
  }

  nuevoRecordatorio() {
    let modal = this.modalCtrl.create(Recordatorio);
    modal.onDidDismiss(data => {
      if (data.success == 1 && data.diagnostico && data.diagnostico != "") {
        var txt;
        if (data.data.length == 1) {
          txt = "medicina";
        }
        else {
          txt = "medicinas";
        }
        this.storage.get("horario").then((res) => {
          if (res != null) {
            this.medicamentos = res;
            this.medicamentos.unshift({"diagnostico": data.diagnostico, "num": data.data.length, "txt": txt, "data": data.data});
            this.storage.set("horario", this.medicamentos);
          }
          else {
            this.medicamentos.push({"diagnostico": data.diagnostico, "num": data.data.length, "txt": txt, "data": data.data});
            this.storage.set("horario", this.medicamentos);
          }
        }).then(() => {
          this.verificar();
        });
      }
    });
    
    modal.present();
  }

  getData(data) {
    let modal = this.modalCtrl.create(Detalle, {data: data, tipo: 2});
    modal.present();
  }

  eliminar() {
    this.storage.remove("horario");
    this.medicamentos = [];
    this.vacio = 1;
  }

}
