import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Recordatorio } from './recordatorio';

@NgModule({
  declarations: [
    Recordatorio,
  ],
  imports: [
    IonicPageModule.forChild(Recordatorio),
  ],
  exports: [
    Recordatorio
  ]
})
export class RecordatorioModule {}
