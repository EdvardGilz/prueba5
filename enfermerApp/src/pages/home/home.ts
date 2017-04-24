import { Component } from '@angular/core';

import { Horario } from '../horario/horario';
import { Presion } from '../presion/presion';
import { Glucosa } from '../glucosa/glucosa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  horario = Horario;
  presion = Presion;
  glucosa = Glucosa;

  constructor() {

  }

}
