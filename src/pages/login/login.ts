import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main';
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
      .subscribe(data => {
        console.log(data)
        data = JSON.parse(data["_body"])
        if(data.status == 0){
          console.log(data['api_token'])
          this.storage.set('api_token', data['api_token'])
          this.storage.set('user_id', data['user']['id'])
          this.navCtrl.setRoot( SelectServicePage )
          this.order.setUserId(data['user']['id'])
          
        }else{
          console.log("No se ha pododp iniciar sesión")
        }
  
  
        
      }, error => {
          console.log("Ha ocurrido un error con la conexión al servidor");
      });
    }


  }


}
