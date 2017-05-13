import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

/*
  Generated class for the CommonFunctions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonFunctions {
  public valArray: number;

  constructor() {
  }

  getDate() {
    var now = moment().format("DD/MM/YY hh:mmA");
    return now;
  }

  getJustDate() {
    var now = moment().format("DD/MM/YYYY");
    return now;
  }

  suma1Dia() {
    var now = moment().add(1, "d").format("DD/MM/YYYY");
    return now;
  }

  sumarNDias(n: number) {
    var now = moment().add(n, "d").format("DD/MM/YYYY");
    return now;
  }

  getHourNow() {
    var now = moment().format("H:mm");
    return now;
  }

  compararHr(hora: number, minutos: number) {
    var fecha = moment().hours(hora).minutes(minutos);
    return moment().isBefore(fecha);
  }

  verificarHr(horas) {
    var hora = "";

    for (var i=0; i<horas.length; i++) {
      if (i <= horas.length-2) {
        if (parseInt(horas[i].split(":")[0]) > parseInt(horas[i+1].split(":")[0])) {
          hora = horas[i+1];
          this.setValArray(i);
        }
      }
    }

    if (hora == "") {
      hora = horas[0];
    }

    return hora;
  }

  setValArray(val) {
    this.valArray = val;
  }

  getValArray() {
    return this.valArray;
  }

  cambiaHorario(primerHora, minutos, res) {
    var ampm;
    var Hora;

    if (primerHora > 24) {
      primerHora -= 24;
    }
    Hora = primerHora;
    if (primerHora == 0) {
      ampm = "AM";
      Hora = "12";
    }
    else if (primerHora < 12) {
      ampm = "AM";
    }
    else if (primerHora == 12) {
      ampm = "PM";
    }
    else if (primerHora == 24) {
      primerHora = 0;
      ampm = "AM";
      Hora -= 12;
    }
    else {
      ampm = "PM";
      Hora -= 12;
    }

    var horarios = Hora + ":" + minutos + " " + ampm + "   ";

    if (res == 0) {
      return horarios;
    }
    else {
      return primerHora;
    }
  }

}
