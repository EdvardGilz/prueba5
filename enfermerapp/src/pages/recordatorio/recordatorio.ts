import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
  public medicamentosData = [];
  public disabled = true;
  public disabled2 = true;
  public diagnostico;

  constructor(public viewCtrl: ViewController, 
              public alertCtrl: AlertController,
              public commonFct: CommonFunctions,
              private localNotifications: LocalNotifications,
              public platform: Platform) {
    this.medicamentos.push({"indefinido": false, "diasD": true, "horasD": true, "PTD": true, "activo": 1});
  }

  agregar() {
    this.medicamentos.push({"indefinido": false, "diasD": true, "horasD": true, "PTD": true, "activo": 1});
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
    var ultimaTomaBan = 0;
    var fechaU = this.commonFct.cambiaFecha(this.commonFct.sumarNDias(parseInt(medicamento.dias)));

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
          proximaTomaTxt += "<br><br> Ultima toma: <br>" + fechaU + " " + this.commonFct.cambiaHorario(proximaToma.split(":")[0], proximaToma.split(":")[1], 0);
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
          var dataHr2 = horariosArray[i];
          proximaTomaTxt += "<br><br> Ultima toma: <br>" + fechaU + " " + this.commonFct.cambiaHorario(dataHr2.split(":")[0], dataHr2.split(":")[1], 0);
          medicamento.UltimaTomaFecha = this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + dataHr2;
        }
      }
    }

    if (ban == 0) { // NO ENCONTRO UN HORARIO PROXIMO
      proximaToma = this.commonFct.verificarHr(horariosArray);
      proximaTomaTxt = this.commonFct.cambiaHorario(proximaToma.split(":")[0], proximaToma.split(":")[1], 0) + " de mañana";
      medicamento.PrimerTomaFecha = this.commonFct.suma1Dia() + " " + proximaToma;

      /** ULTIMA TOMA */
      if (medicamento.indefinido == false) {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 12 am cada 12 hrs
        var index = this.commonFct.getValArray();
        var dataHr3 = horariosArray[index];
        proximaTomaTxt += "<br><br> Ultima toma: <br>" + fechaU + " " + this.commonFct.cambiaHorario(dataHr3.split(":")[0], dataHr3.split(":")[1], 0);
        medicamento.UltimaTomaFecha = this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + dataHr3;
      }
    }
    medicamento.horarios = horariosArray;

    /**SI ENTRA AQUI QUIERE DECIR QUE EL PRIMER ELEMENTO DEL ARRAY ES LA PROXIMA HORA, 
    * POR LO TANTO EL ULTIMO ELEMENTO ES LA ULTIMA TOMA */
    /** ULTIMA TOMA */
    if (ultimaTomaBan == 1 && medicamento.indefinido == false) {
      var dataHr4 = medicamento.horarios[medicamento.horarios.length-1];
      proximaTomaTxt += "<br><br> Ultima toma: <br>" + fechaU + " " + this.commonFct.cambiaHorario(dataHr4.split(":")[0], dataHr4.split(":")[1], 0);
      medicamento.UltimaTomaFecha = this.commonFct.sumarNDias(parseInt(medicamento.dias)) + " " + dataHr4;
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
    var notificaciones = [];
    var sonido;

    if (this.platform.is("android")) {
      sonido = "file://assets/ringtone/wa_wa_waaa.mp3";
    }
    else{
      sonido = "file://assets/ringtone/wa_wa_waaa.caf";
    }

    this.medicamentos.forEach(element => {
      if (element.PrimerTomaFecha) {
        this.medicamentosData.push(element);
      }
    });

    for (var i = 0; i < this.medicamentosData.length; i++) {
      var fecha;
      var paso1 = String(24 / parseInt(this.medicamentosData[i].horas));
      var numSteps;

      if (this.medicamentosData[i].indefinido == false) {
        numSteps = parseInt(paso1) * parseInt(this.medicamentosData[i].dias);
      }
      else {
        numSteps = 10;
      }

      console.log(numSteps);
      for (var j=0; j < numSteps; j++) {
        var id = Math.floor((Math.random() * 1000) + 1);
        
        if (j == 0) {
          fecha = this.commonFct.getADay(this.medicamentosData[i].PrimerTomaFecha, 0);
        }
        else {
          fecha = this.commonFct.getADay(fecha, parseInt(this.medicamentosData[i].horas));
        }
        
        notificaciones.push({"id": id, "title": "Hora de tu medicina", "at": fecha, "text": this.medicamentosData[i].medicina, "sound": sonido});
      }
    }

    this.localNotifications.schedule(notificaciones);
    this.viewCtrl.dismiss({"success": 1, "data": this.medicamentosData, "diagnostico": this.diagnostico});
  }

  cerrar() {
    this.viewCtrl.dismiss({"success": 0});
  }
}
