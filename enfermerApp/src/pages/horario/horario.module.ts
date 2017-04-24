import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Horario } from './horario';

@NgModule({
  declarations: [
    Horario,
  ],
  imports: [
    IonicPageModule.forChild(Horario),
  ],
  exports: [
    Horario
  ]
})
export class HorarioModule {}
