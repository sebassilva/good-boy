import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { MainPage } from '../main/main'
import { RegisterPage } from '../register/register'
import { SelectServicePage } from '../select-service/select-service'
import { HomeProviderPage } from '../home-provider/home-provider'
import { MainProviderPage } from '../main-provider/main-provider'

import { Storage } from '@ionic/storage';

import { OrderProvider } from '../../providers/order/order';
import { DisableSideMenu } from '../../decorators/disable-side-menu.decorator';

@DisableSideMenu()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login: any;
  register: any;
  homeProvider: any
  constructor(public navCtrl: NavController, 
    public storage: Storage, 
    public order: OrderProvider) {
    this.login = MainPage;
    this.register = RegisterPage;
    this.homeProvider = HomeProviderPage
    
    this.storage.get('api_token').then(api_token =>{
      this.storage.get('is_provider').then(is_provider =>{

        if(api_token){
          this.storage.get('user_id').then(val =>{
            this.order.setUserId(val)
            console.log("Se ha seteado el user_id" + this.order.getUserId())   
            if(is_provider){
              this.navCtrl.setRoot( MainProviderPage )                  

            }else{
              this.navCtrl.setRoot( SelectServicePage )                  
            }       
          })
        }


      })
    })
  }

}
