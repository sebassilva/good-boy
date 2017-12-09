import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {
  title: string
  newPetForm: FormGroup
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public http: Http,
    public storage: Storage) {
    this.title = "Agregar Perrito"

    this.newPetForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      breed: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');
  }

  
  register(){
    if(this.newPetForm.valid){
      let newPet = this.newPetForm.value
      newPet['owner'] = this.storage.get('user_id');
      newPet['img'] = "default"
      newPet['profile'] = ""
      newPet['rate'] = 5
      var link = 'http://localhost/api/pet/new';
      
      this.http.post(link, newPet)
      .subscribe(data => {
        data = JSON.parse(data["_body"])
        if(data.status == 0){
          
  
        }else{
          console.log("no se ha podido crear el perritu")
        }
  
  
        
      }, error => {
          console.log("Ha ocurrido un error con la conexión al servidor");
      });
    }      
  }

}
