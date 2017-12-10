import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main';


import { OrderProvider } from '../../providers/order/order';


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
    public order: OrderProvider) {


      this.userForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    });
  }

  ionViewDidLoad() {

  }

  login(){
    if(this.userForm.valid){
      let newUser = this.userForm.value
      var link = 'http://localhost/api/user/login';
      
      this.http.post(link, newUser)
      .subscribe(data => {
        console.log(data)
        data = JSON.parse(data["_body"])
        if(data.status == 0){
          console.log(data['api_token'])
          this.storage.set('api_token', data['api_token'])
          this.storage.set('user_id', data['user']['id'])
          this.navCtrl.setRoot( MainPage )
          this.order.setUserId(data['user']['id'])
          
        }else{
          console.log("no se ha podido crear el usuario")
        }
  
  
        
      }, error => {
          console.log("Ha ocurrido un error con la conexión al servidor");
      });
    }


  }


}
