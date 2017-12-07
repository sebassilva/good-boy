import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { NewPage } from '../new/new';

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
    public storage: Storage) {

      this.userForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
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
      newUser['docAddress'] = "", 
      newUser["freeServices"] = 0
      var link = 'http://localhost/api/user/new';
      
      this.http.post(link, newUser)
      .subscribe(data => {
        data = JSON.parse(data["_body"])
        if(data.status == 0){
          console.log(data['api_token'])
          this.storage.set('api_token', data['api_token'])
          this.navCtrl.setRoot( NewPage )
  
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
