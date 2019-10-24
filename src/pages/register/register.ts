import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { NewPetPage } from '../new-pet/new-pet';

import { OrderProvider } from '../../providers/order/order';
import { ApiProvider } from '../../providers/api/api';
import { DisableSideMenu } from '../../decorators/disable-side-menu.decorator';

@DisableSideMenu()
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
    public order: OrderProvider, 
    public api: ApiProvider) {

      this.userForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*'), Validators.required])],
        lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*'), Validators.required])],
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
      console.log('Se está registrando el usuario')
      this.api.post('user/new', newUser)
      .map(response => response.json())
      .subscribe(data => {
        if(data.status == 0){
          data['is_provider'] = false

          console.log(data.api_token)
          this.storage.set('api_token', data.api_token)
          this.storage.set('user_id', data.user.id)
          this.storage.set('is_provider', false)
          this.order.setUserId(data.user.id)
          this.storage.set('email', data.user.email)
          this.api.update()
          this.navCtrl.setRoot( NewPetPage )
  
        }else{
          this.api.showNotification(data.message)
        }   
      }, error => {
        this.api.showNotification("Ha ocurrido un problema con la conexión al servidor")
      });

    }      
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
