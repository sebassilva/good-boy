import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register'
import { MainPage } from '../main/main'
import { Storage } from '@ionic/storage';

import { OrderProvider } from '../../providers/order/order';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login: any;
  register: any;
  constructor(public navCtrl: NavController, 
    public storage: Storage, 
    public order: OrderProvider) {
    this.login = LoginPage;
    this.register = RegisterPage;
    this.storage.get('api_token').then(val =>{
      if(val){
        this.storage.get('user_id').then(val =>{
          this.order.setUserId(val)
          console.log("Se ha seteado el user_id" + this.order.getUserId())          
          this.navCtrl.setRoot( MainPage )                  
        })
      }
    })
  }

}
