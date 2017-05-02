import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';

import { CommonFunctions } from '../../providers/common-functions';

/**
 * Generated class for the Recordatorio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recordatorio',
  templateUrl: 'recordatorio.html',
})
export class Recordatorio {
  public medicamentos = [];
  public disabled = true;
  public disabled2 = true;
  public diagnostico;

  constructor(public viewCtrl: ViewController, 
              public alertCtrl: AlertController,
              public commonFct: CommonFunctions) {
    this.medicamentos.push({"indefinido": false, "diasD": true, "horasD": true, "PTD": true});
  }

  agregar() {
    this.medicamentos.push({"indefinido": false, "diasD": true, "horasD": true, "PTD": true});
  }

  change(medicamento) {
    if (medicamento.medicina && medicamento.medicina != "") {
      medicamento.diasD = false;
    }
    else {
      medicamento.diasD = true;
      medicamento.horasD = true;
      medicamento.PTD = true;
    }
    if (medicamento.dias && medicamento.dias != "" && medicamento.diasD == false) {
      medicamento.horasD = false;
    }
    else {
      medicamento.horasD = true;
      medicamento.PTD = true;
    }
    if (medicamento.horas && medicamento.horas != "") {
      medicamento.PTD = false;
    }
    else {
      medicamento.PTD = true;
    }
    if (medicamento.indefinido == true) {
      medicamento.horasD = false;
    }
  }

  alerta(medicamento) {
    var paso1 = String(24 / parseInt(medicamento.horas));
    var pastillas;
    var texto = "";
    var horariosArray = [];
    var proximaToma;
    var ban = 0;
    var proximaTomaTxt;
    var ultimaTomaBan = 0;;

    if (medicamento.indefinido == false) {
      pastillas = parseInt(paso1) * parseInt(medicamento.dias);
      texto = "Tienes que tener " + pastillas + " pastillas.<br>";
    }
    
    var minutos = medicamento.primerToma.split(":")[1]
    var primerHora = parseInt(medicamento.primerToma.split(":")[0]);
    var horarios = this.commonFct.cambiaHorario(primerHora, minutos, 0);

    horariosArray.push(this.commonFct.cambiaHorario(primerHora, minutos, 1) + ":" + minutos);
    if (this.commonFct.compararHr(this.commonFct.cambiaHorario(primerHora, minutos, 1), parseInt(minutos)) == true) {
      proximaToma = this.commonFct.cambiaHorario(primerHora, minutos, 1) + ":" + minutos;
      proximaTomaTxt = this.commonFct.cambiaHorario(proximaToma.split(":")[0], proximaToma.split(":")[1], 0) + " de hoy";
      medicamento.PrimerTomaFecha = this.commonFct.getJustDate() + " " + proximaToma;
      ban = 1;
      /**SI ENTRA AQUI QUIERE DECIR QUE EL PRIMER ELEMENTO DEL ARRAY ES LA PROXIMA HORA, 
       * POR LO TANTO EL ULTIMO ELEMENTO ES LA ULTIMA TOMA */
      ultimaTomaBan = 1; 
    }
    else {
      if (parseInt(paso1) == 1) { // DEL OTRO DIA 24 HRS
        proximaToma = this.commonFct.cambiaHorario(primerHora, minutos, 1) + ":" + minutos;
        proximaTomaTxt = this.commonFct.cambiaHorario(proximaToma.split(":")[0], proximaToma.split(":")[1], 0) + " de mañana";
        medicamento.PrimerTomaFecha = this.commonFct.suma1Dia() + " " + proximaToma
        ban = 1;

        /** ULTIMA TOMA */
        if (medicamento.indefinido == false) {
          proximaTomaTxt += "<br> Ultima toma: <br>" + this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + this.commonFct.cambiaHorario(proximaToma.split(":")[0], proximaToma.split(":")[1], 0);
          medicamento.UltimaTomaFecha = this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + proximaToma;
        }
      }
    }

    for (var i=0; i<parseInt(paso1)-1; i++) {
      primerHora += parseInt(medicamento.horas);
      horarios += this.commonFct.cambiaHorario(primerHora, minutos, 0);
      horariosArray.push(this.commonFct.cambiaHorario(primerHora, minutos, 1) + ":" + minutos);
      if (this.commonFct.compararHr(this.commonFct.cambiaHorario(primerHora, minutos, 1), parseInt(minutos)) == true && ban == 0) {
        proximaToma = this.commonFct.cambiaHorario(primerHora, minutos, 1) + ":" + minutos;
        proximaTomaTxt = this.commonFct.cambiaHorario(proximaToma.split(":")[0], proximaToma.split(":")[1], 0) + " de hoy";
        medicamento.PrimerTomaFecha = this.commonFct.getJustDate() + " " + proximaToma;
        ban = 1;

        /** ULTIMA TOMA */
        if (medicamento.indefinido == false) {
          proximaTomaTxt += "<br> Ultima toma: <br>" + this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + this.commonFct.cambiaHorario(horariosArray[i].split(":")[0], horariosArray[i].split(":")[1], 0);
          medicamento.UltimaTomaFecha = this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + horariosArray[i];
        }
      }
    }

    if (ban == 0) { // NO ENCONTRO UN HORARIO PROXIMO
      proximaToma = this.commonFct.verificarHr(horariosArray);
      proximaTomaTxt = this.commonFct.cambiaHorario(proximaToma.split(":")[0], proximaToma.split(":")[1], 0) + " de mañana";
      medicamento.PrimerTomaFecha = this.commonFct.suma1Dia() + " " + proximaToma;

      /** ULTIMA TOMA */
      if (medicamento.indefinido == false) {
        var index = this.commonFct.getValArray();
        proximaTomaTxt += "<br> Ultima toma: <br>" + this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + this.commonFct.cambiaHorario(horariosArray[index].split(":")[0], horariosArray[index].split(":")[1], 0);
        medicamento.UltimaTomaFecha = this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + horariosArray[index];
      }
    }
    medicamento.horarios = horariosArray;

    /**SI ENTRA AQUI QUIERE DECIR QUE EL PRIMER ELEMENTO DEL ARRAY ES LA PROXIMA HORA, 
    * POR LO TANTO EL ULTIMO ELEMENTO ES LA ULTIMA TOMA */
    /** ULTIMA TOMA */
    if (ultimaTomaBan == 1 && medicamento.indefinido == false) {
      proximaTomaTxt += "<br> Ultima toma: <br>" + this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + this.commonFct.cambiaHorario(medicamento.horarios[medicamento.horarios.length-1].split(":")[0], medicamento.horarios[medicamento.horarios.length-1].split(":")[1], 0);
      medicamento.UltimaTomaFecha = this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + medicamento.horarios[medicamento.horarios.length-1];
    }

    var subtitulo = "Tu próxima toma es a las:<br>" + proximaTomaTxt;
    texto += "Tus horarios quedaron asi:<br>" + horarios;

    let alert = this.alertCtrl.create({
      title: "Horarios",
      subTitle: subtitulo,
      message: texto,
      buttons: ['OK']
    });

    alert.present();

    console.log(medicamento);

    this.disabled2 = false;
  }

  eliminar(index) {
    if (this.medicamentos.length > 1) {
      this.medicamentos.splice(index, 1);
      if (this.medicamentos.length == 1) {
        if (this.medicamentos[0].PTD == true) {
          this.disabled2 = true;
        }
      }
    }
    else {
      this.medicamentos = [];
      this.medicamentos.push({"indefinido": false, "diasD": true, "horasD": true, "PTD": true});
      this.disabled2 = true;
    }
  }

  activar() {
    if (this.diagnostico && this.diagnostico != "") {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
  }

  guardar() {
    this.viewCtrl.dismiss({"success": 1, "data": this.medicamentos, "diagnostico": this.diagnostico});
  }

  cerrar() {
    this.viewCtrl.dismiss({"success": 0});
  }
}
