import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register'
import { MainPage } from '../main/main'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login: any;
  register: any;
  constructor(public navCtrl: NavController, public storage: Storage) {
    this.login = LoginPage;
    this.register = RegisterPage;
    this.storage.get('api_token').then(val =>{
      if(val){
        this.navCtrl.setRoot( MainPage )        
      }
    })
  }

}
