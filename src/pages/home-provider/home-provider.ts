import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProviderPage } from '../login-provider/login-provider'
import { RegisterProviderPage } from '../register-provider/register-provider'
import { MainProviderPage } from '../main-provider/main-provider'

import { Storage } from '@ionic/storage';
import { OrderProvider } from '../../providers/order/order';

import { DisableSideMenu } from '../../decorators/disable-side-menu.decorator';

@DisableSideMenu()
@Component({
  selector: 'page-home-provider',
  templateUrl: 'home-provider.html',
})
export class HomeProviderPage {


  login: any;
  register: any;
  homeProvider: any
  constructor(public navCtrl: NavController, 
    public storage: Storage, 
    public order: OrderProvider) {
    this.login = LoginProviderPage;
    this.register = RegisterProviderPage;
    
    this.storage.get('api_token').then(val =>{
      if(val){
        this.storage.get('user_id').then(val =>{
          this.order.setUserId(val)
          console.log("Se ha seteado el user_id" + this.order.getUserId())          
          console.log("Se ha iniciado sesión como provider omg")          
          this.navCtrl.setRoot( MainProviderPage )                  
        })
      }
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProviderPage');
  }

}
