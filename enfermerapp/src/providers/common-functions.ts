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
  public meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                   "Julio", "Agosto", "Septiembr", "Octubre", "Noviembre", "Diciembre"];

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

  getADay(fecha) {
    var dia = fecha.split(" ")[0].split("/")[0];
    var mes = fecha.split(" ")[0].split("/")[1] -1;
    var anio = fecha.split(" ")[0].split("/")[2];
    var hora = fecha.split(" ")[1].split(":")[0];
    var min = fecha.split(" ")[1].split(":")[1];

    // var fechaComp = moment().date(dia).month(mes).year(anio).hours(hora).minutes(min);
    var fechaComp = new Date();
    fechaComp.setFullYear(anio);
    fechaComp.setMonth(mes);
    fechaComp.setDate(dia);
    fechaComp.setHours(hora);

    return fechaComp;
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

  compararFecha(fecha) {
    var dia = fecha.split(" ")[0].split("/")[0];
    var mes = fecha.split(" ")[0].split("/")[1];
    var anio = fecha.split(" ")[0].split("/")[2];
    var hora = fecha.split(" ")[1].split(":")[0];
    var min = fecha.split(" ")[1].split(":")[1];

    var fechaComp = moment().date(dia).month(mes -1).year(anio).hours(hora).minutes(min);

    return moment().isBefore(fechaComp);
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
      this.setValArray(1);
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

  cambiaFecha(fecha) {
    var numDia = fecha.split("/")[0];
    var numMes = fecha.split("/")[1] -1;

    return numDia + " de " + this.meses[numMes];
  }

}
