import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';


/*Pages*/
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MainPage } from '../pages/main/main';
import { NewPage } from '../pages/new/new';
import { NewPetPage } from '../pages/new-pet/new-pet';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage, 
    LoginPage, 
    RegisterPage, 
    MainPage, 
    NewPage, 
    NewPetPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    HttpModule, 
    IonicStorageModule.forRoot()  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, 
    LoginPage, 
    RegisterPage, 
    MainPage, 
    NewPage, 
    NewPetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
