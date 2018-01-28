import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
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
import { PaymentPage } from '../pages/payment/payment';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderProvider } from '../providers/order/order';
import { ApiProvider } from '../providers/api/api';
import { ResumePage } from '../pages/resume/resume';

/*camer plugins*/

import { Camera } from '@ionic-native/camera';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

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
    PaymentPage
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
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrderProvider,
    ApiProvider, 
    Camera, 
    PayPal
    ]
})

export class AppModule {

  static injector: Injector;

  constructor(injector: Injector) {    
      // Make the injector to be available in the entire module
      AppModule.injector = injector;    
  }
}
