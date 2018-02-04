import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { MainProviderPage } from '../main-provider/main-provider';


import { OrderProvider } from '../../providers/order/order';
import { ApiProvider } from '../../providers/api/api';
import { DisableSideMenu } from '../../decorators/disable-side-menu.decorator';

@DisableSideMenu()


@IonicPage()
@Component({
  selector: 'page-login-provider',
  templateUrl: 'login-provider.html',
})
export class LoginProviderPage {

  userForm: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public http: Http,
    public storage: Storage, 
    public order: OrderProvider, 
    public api: ApiProvider) {


    this.userForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    });
  }



  login(){
    if(this.userForm.valid){
      let newUser = this.userForm.value
      
      this.api.post('provider/login', newUser)
      .map(res => res.json())
      .subscribe(data => {
        if(data.status == 0){
          console.log(data)
          data['is_provider'] = true
          this.storage.set('api_token', data.api_token)
          this.storage.set('user_id', data.user.id)
          this.order.setUserId(data.user.id)
          this.storage.set('is_provider', true)
          this.order.setUserId(data.user.id)
          this.api.update(data)
          this.navCtrl.setRoot( MainProviderPage )

        }else{
          this.api.showNotification(data['message'])
        }
      }, error => {
          this.api.showNotification("Ha ocurrido un problema con la conexión al servidor")
      });
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginProviderPage');
  }

}
