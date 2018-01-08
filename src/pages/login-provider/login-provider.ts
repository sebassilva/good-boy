import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main';
import { MainProviderPage } from '../main-provider/main-provider';


import { OrderProvider } from '../../providers/order/order';



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
    public order: OrderProvider) {


    this.userForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    });
  }



  login(){
    if(this.userForm.valid){
      let newUser = this.userForm.value
      var link = 'http://localhost/api/provider/login';
      
      this.http.post(link, newUser)
      .subscribe(data => {
        console.log(data)
        data = JSON.parse(data["_body"])
        if(data.status == 0){
          this.storage.set('api_token', data['api_token'])
          this.storage.set('user_id', data['user']['id'])
          this.order.setUserId(data['user']['id'])
          this.storage.set('is_provider', true)

          this.navCtrl.setRoot( MainProviderPage )

        }else{
          console.log("No se ha pododp iniciar sesión")
        }
  
  
        
      }, error => {
          console.log("Ha ocurrido un error con la conexión al servidor");
      });
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginProviderPage');
  }

}
