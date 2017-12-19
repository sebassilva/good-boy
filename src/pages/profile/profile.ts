import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage'

import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userForm: FormGroup

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public formBuilder: FormBuilder, 
    public storage: Storage) {

    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
    });

    this.storage.get('user_id').then(user_id=>{
      this.api.get('user/' + user_id).subscribe(user=>{
        this.userForm.setValue({
          name: user.name,
          //lastname: user.lastname, 
          telephone: user.telephone, 

        })
      })
      
    })

    


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
