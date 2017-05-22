import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Horario } from '../pages/horario/horario';
import { Presion } from '../pages/presion/presion';
import { Glucosa } from '../pages/glucosa/glucosa';
import { Detalle } from '../pages/detalle/detalle';
import { Recordatorio } from '../pages/recordatorio/recordatorio';

import { CommonFunctions } from '../providers/common-functions';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Horario,
    Presion,
    Glucosa,
    Detalle,
    Recordatorio
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Horario,
    Presion,
    Glucosa,
    Detalle,
    Recordatorio
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonFunctions,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
