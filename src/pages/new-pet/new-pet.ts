import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';
import { SelectServicePage } from '../select-service/select-service'
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-new-pet',
  templateUrl: 'new-pet.html',
})
export class NewPetPage {
  userForm: FormGroup
  formComplete: boolean
  foods: any
  dog: any
  isEdition: boolean
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public formBuilder: FormBuilder,
    public http: Http,
    public storage: Storage, 
    public api: ApiProvider) {

      (this.navParams.get('id')) ? this.isEdition = true : this.isEdition = false

      this.api.get('food').subscribe(foods => {
        this.foods = foods.data
      })
      this.formComplete = false
      this.userForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        breed: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
        profile: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
        food_id: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
    });


    if(this.isEdition){
      this.userForm.setValue({
         name: this.navParams.get('name'), 
         breed: this.navParams.get('breed'), 
         profile: this.navParams.get('profile'), 
         food_id: this.navParams.get('food_id')
      })
     }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPetPage');
  }

  register(){
   if(this.isEdition){
     this.editPet()
   }else{
     this.newPet()
   }

  }


  newPet(){
    if(this.userForm.valid){
      let newUser = this.userForm.value
      console.log(newUser)
      newUser['img'] = "default"
      newUser['docVaccine'] = "default"
      newUser["rate"] = 5
      this.storage.get('user_id').then(user_id =>{
        newUser.profile = newUser.profile.join('**')

        newUser["user_id"] = user_id
        this.api.post('pet/new', newUser)
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

  editPet(){
    if(this.userForm.valid){
      let newUser = this.userForm.value
      console.log(newUser)
      this.storage.get('user_id').then(user_id =>{
        newUser.profile = newUser.profile.join('**')
        newUser.id = this.navParams.get('id')

        newUser["user_id"] = user_id
        this.api.post('pet/edit/' + newUser.id, newUser)
        .subscribe(data => {
          data = data.json()
          console.log(data.status)
          //Go back and notify
          if(data.status == 0){
            this.navCtrl.pop()
          }
          this.api.showNotification(data['message'])

        }, error => {
            console.log("Ha ocurrido un error con la conexión al servidor");
        });
      })
    

    }   

  }
  continue(){
    this.navCtrl.setRoot(SelectServicePage)
  }

  addMore(){
    this.userForm.reset()
    this.formComplete = false
  }
}
