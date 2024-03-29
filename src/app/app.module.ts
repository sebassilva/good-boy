import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { Injector } from '@angular/core'

/*Pages*/
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MainPage } from '../pages/main/main';
import { NewPage } from '../pages/new/new';
import { SelectServicePage } from '../pages/select-service/select-service';
import { NewPetPage } from '../pages/new-pet/new-pet';
import { MapPage } from '../pages/map/map';
import { ChooseDogPage } from '../pages/choose-dog/choose-dog';
import { OrdersPage } from '../pages/orders/orders';
import { ProfilePage } from '../pages/profile/profile';
import { HomeProviderPage } from '../pages/home-provider/home-provider';
import { LoginProviderPage } from '../pages/login-provider/login-provider';
import { RegisterProviderPage } from '../pages/register-provider/register-provider';
import { MainProviderPage } from '../pages/main-provider/main-provider';
import { OrderInfoModalPage } from '../pages/order-info-modal/order-info-modal';
import { ProviderLegalsPage } from '../pages/provider-legals/provider-legals';
import { ResumePage } from '../pages/resume/resume';
import { CurrentOrderPage } from '../pages/current-order/current-order';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderProvider } from '../providers/order/order';
import { ApiProvider } from '../providers/api/api';

/*camer plugins*/

import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage, 
    LoginPage, 
    RegisterPage, 
    MainPage, 
    NewPage, 
    NewPetPage, 
    SelectServicePage, 
    MapPage, 
    ChooseDogPage, 
    OrdersPage, 
    ResumePage, 
    ProfilePage, 
    HomeProviderPage, 
    LoginProviderPage, 
    RegisterProviderPage, 
    MainProviderPage, 
    OrderInfoModalPage, 
    ProviderLegalsPage, 
    CurrentOrderPage
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
    NewPetPage, 
    SelectServicePage, 
    MapPage, 
    ChooseDogPage, 
    OrdersPage, 
    ResumePage, 
    ProfilePage, 
    HomeProviderPage, 
    LoginProviderPage, 
    RegisterProviderPage, 
    MainProviderPage, 
    OrderInfoModalPage, 
    ProviderLegalsPage, 
    CurrentOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrderProvider,
    ApiProvider, 
    Camera, 
    ]
})

export class AppModule {

  static injector: Injector;

  constructor(injector: Injector) {    
      // Make the injector to be available in the entire module
      AppModule.injector = injector;    
  }
}
