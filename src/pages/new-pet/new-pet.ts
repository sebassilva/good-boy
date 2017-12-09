import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-new-pet',
  templateUrl: 'new-pet.html',
})
export class NewPetPage {
  userForm: FormGroup
  formComplete: boolean
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public formBuilder: FormBuilder,
    public http: Http,
    public storage: Storage) {

      this.formComplete = false
      this.userForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        breed: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
        profile: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPetPage');
  }

  register(){
    if(this.userForm.valid){
      let newUser = this.userForm.value
      newUser['img'] = "default"
      newUser['docVaccine'] = "default"
      newUser["rate"] = 5
      this.storage.get('user_id').then(user_id =>{
        console.log(newUser)
        newUser.profile = newUser.profile.join('**')
        console.log(newUser)

        var link = 'http://localhost/api/pet/new';
        newUser["user_id"] = user_id
        this.http.post(link, newUser)
        .subscribe(data => {
          data = JSON.parse(data["_body"])
          console.log(data.status)
          if(data.status == 0){
            this.formComplete = true
            console.log(data)
          }else{
            console.log(data['error'])
          }
    
    
          
        }, error => {
            console.log("Ha ocurrido un error con la conexión al servidor");
        });
      })
    
  
    
    
    
    }      

  }

  continue(){

  }

  addMore(){
    this.formComplete = false
  }
}
