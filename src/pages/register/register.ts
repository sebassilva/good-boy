import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { NewPetPage } from '../new-pet/new-pet';

import { OrderProvider } from '../../providers/order/order';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
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
    });



  }

  register(){
    if(this.userForm.valid){
      let newUser = this.userForm.value
      newUser['type'] = "user"
      newUser['img'] = "default"
      newUser['sharingCode'] = "user"
      newUser['docId'] = ""
      newUser['docAddress'] = ""
      newUser["freeServices"] = 0
      var link = 'http://localhost/api/user/new';
      console.log('Se está registrando el usuario')
      this.http.post(link, newUser)
      .subscribe(data => {
        data = JSON.parse(data["_body"])
        console.log(data.status)
        if(data.status == 0){
          console.log(data['api_token'])
          this.storage.set('api_token', data['api_token'])
          this.storage.set('user_id', data['user']['id'])
          this.order.setUserId(data['user']['id'])
          this.navCtrl.setRoot( NewPetPage )
  
        }else{
          console.log("no se ha podido crear el usuario")
        }
  
  
        
      }, error => {
          console.log("Ha ocurrido un error con la conexión al servidor");
      });
  
    
    
    
    }      
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
