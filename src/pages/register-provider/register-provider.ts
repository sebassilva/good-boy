import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { MainProviderPage } from '../main-provider/main-provider';

import { OrderProvider } from '../../providers/order/order';


@IonicPage()
@Component({
  selector: 'page-register-provider',
  templateUrl: 'register-provider.html',
})
export class RegisterProviderPage {
  userForm: FormGroup;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public http: Http,
    public storage: Storage, 
    public order: OrderProvider) {

      this.userForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        telephone: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
        description: ['', Validators.compose([Validators.maxLength(500),  Validators.required])],
    });



  }

  register(){
    console.log('register')
    if(this.userForm.valid){
    console.log('thi.userform.valid')      
      let newUser = this.userForm.value
      newUser['type'] = "user"
      newUser['img'] = "default"
      newUser['sharingCode'] = "user"
      newUser['docId'] = ""
      newUser['docAddress'] = ""
      newUser["freeServices"] = 0
      var link = 'http://localhost/api/provider/new';
      console.log('Se está registrando el usuario')
      this.http.post(link, newUser)
      .subscribe(data => {
        data = JSON.parse(data["_body"])
        console.log(data.status)
        if(data.status == 0){
          console.log(data['api_token'])
          this.storage.set('api_token', data['api_token'])
          this.storage.set('user_id', data['user']['id'])
          this.storage.set('is_provider', true)
          this.order.setUserId(data['user']['id'])
          this.navCtrl.setRoot( MainProviderPage )
  
        }else{
          console.log("no se ha podido crear el usuario")
        }
  
  
        
      }, error => {
          console.log("Ha ocurrido un error con la conexión al servidor");
      });
  
    
    
    
    }      
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterProviderPage');
  }

}
