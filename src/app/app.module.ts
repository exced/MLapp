import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { TrainPage } from '../pages/train/train';
import { TestPage } from '../pages/test/test';
import { InfoPage } from '../pages/info/info';
import { CRUDPage } from '../pages/crud/crud';
import { DataService } from '../providers/data.service';

import { CustomFormsModule } from 'ng2-validation'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TrainPage,
    TestPage,
    InfoPage,
    CRUDPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TrainPage,
    TestPage,
    InfoPage,
    CRUDPage
  ],
  providers: [
    DataService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
