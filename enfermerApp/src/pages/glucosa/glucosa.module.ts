import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Glucosa } from './glucosa';

@NgModule({
  declarations: [
    Glucosa,
  ],
  imports: [
    IonicPageModule.forChild(Glucosa),
  ],
  exports: [
    Glucosa
  ]
})
export class GlucosaModule {}
