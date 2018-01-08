import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { SelectServicePage } from '../pages/select-service/select-service';

import { Storage } from '@ionic/storage';
import { OrdersPage } from '../pages/orders/orders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: any;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Mi Perfil', component: ProfilePage },
      { title: 'Mis Órdenes', component: OrdersPage },
      { title: 'Salir' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component){
      this.nav.setRoot(page.component);      
    }else{
      this.logout()
    }
  }

  logout(){
    this.storage.clear()
    this.storage.remove('user_id')
    this.storage.remove('api_token')
    this.nav.setRoot(HomePage);

  }
}
