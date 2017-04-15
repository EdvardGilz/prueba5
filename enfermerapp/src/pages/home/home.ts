import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { HorarioPage } from '../horario/horario';
import { PresionPage } from '../presion/presion';
import { GlucosaPage } from '../glucosa/glucosa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  horario = HorarioPage;
  presion = PresionPage;
  glucosa = GlucosaPage;

  constructor(public navCtrl: NavController) {
    
  }

}
