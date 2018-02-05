import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { ProviderLegalsPage } from '../provider-legals/provider-legals';

import { OrderProvider } from '../../providers/order/order';
import { ApiProvider } from '../../providers/api/api';
import { DisableSideMenu } from '../../decorators/disable-side-menu.decorator';

@DisableSideMenu()

@IonicPage()
@Component({
  selector: 'page-register-provider',
  templateUrl: 'register-provider.html',
})
export class RegisterProviderPage {
  userForm: FormGroup;
  services: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public http: Http,
    public storage: Storage, 
    public order: OrderProvider, 
    public api: ApiProvider) {

      this.api.get('service').subscribe(data => {
        this.services = data.data
      });
      this.userForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*'), Validators.required])],
        lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        telephone: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
        servicesOfered: ['', Validators.compose([Validators.maxLength(500),  Validators.required])],
    });



  }

  register(){
    console.log('register')
    if(this.userForm.valid){
      console.log('thi.userform.valid')      
      let newUser = this.userForm.value
      newUser['type'] = "provider"
      newUser['img'] = "default"
      newUser['docId'] = ""
      newUser['docAddress'] = ""

      this.api.post('provider/new', newUser)
      .map(res => res.json())
      .subscribe(data => {
        if(data.status == 0){
          data['is_provider'] = true
          console.log(data.api_token)
          this.storage.set('api_token', data.api_token)
          this.storage.set('user_id', data.user.id)
          this.storage.set('is_provider', true)
          this.order.setUserId(data.user.id)
          this.api.update(data)
          this.navCtrl.setRoot( ProviderLegalsPage )
  
        }else{
          this.api.showNotification(data['message'])
        }      
      }, error => {
        this.api.showNotification("Ha ocurrido un problema con la conexión al servidor")
      });
  
    
    
    
    }      
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterProviderPage');
  }

}
