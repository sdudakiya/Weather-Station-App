import { TabsPage } from './../pages/tabs/tabs';
import { PressurePage } from './../pages/pressure/pressure';
import { TemperaturePage } from './../pages/temperature/temperature';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ThinkspeakProvider } from '../providers/thinkspeak/thinkspeak';
import { ChartsModule } from 'ng2-charts';
import { GaugeModule } from 'angular-gauge';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TemperaturePage,
    PressurePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    HttpClientModule,
    GaugeModule.forRoot(),    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TemperaturePage,
    PressurePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ThinkspeakProvider
  ]
})
export class AppModule {}
