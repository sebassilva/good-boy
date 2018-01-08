import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';


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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderProvider } from '../providers/order/order';
import { ApiProvider } from '../providers/api/api';
import { ResumePage } from '../pages/resume/resume';

/*camer plugins*/
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
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
    OrderInfoModalPage
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
    OrderInfoModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrderProvider,
    ApiProvider, 
    File,
    Transfer,
    Camera,
    FilePath,
  ]
})
export class AppModule {}
