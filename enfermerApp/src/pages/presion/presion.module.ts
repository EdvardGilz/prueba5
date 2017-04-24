import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Presion } from './presion';

@NgModule({
  declarations: [
    Presion,
  ],
  imports: [
    IonicPageModule.forChild(Presion),
  ],
  exports: [
    Presion
  ]
})
export class PresionModule {}
