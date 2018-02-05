import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { SelectServicePage } from '../select-service/select-service';


import { OrderProvider } from '../../providers/order/order';
import { ApiProvider } from '../../providers/api/api';
import { DisableSideMenu } from '../../decorators/disable-side-menu.decorator';

@DisableSideMenu()

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
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

  ionViewDidLoad() {

  }

  login(){
    console.log("login started")
    if(this.userForm.valid){
    console.log("login valid")
      
      let newUser = this.userForm.value
      
      this.api.post('user/login', newUser)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data)
        if(data.status === 0){
          console.log(data.api_token)
          data['is_provider'] = false

          this.storage.set('api_token', data.api_token)
          this.storage.set('user_id', data.user.id)
          this.storage.set('is_provider', false)
          this.storage.set('email', data.user.email)

          this.navCtrl.setRoot( SelectServicePage )
          this.order.setUserId(data.user.id)
        }else{
          this.api.showNotification(data.message)
        }
      }, error => {
        this.api.showNotification("Ha ocurrido un problema con la conexión al servidor")
      });
    }


  }


}
