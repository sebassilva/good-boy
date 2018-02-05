import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'
import { SelectServicePage } from '../select-service/select-service'
import { ApiProvider } from '../../providers/api/api'

import { DomSanitizer } from '@angular/platform-browser'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
  imgPreview: any
  base64Image
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public formBuilder: FormBuilder,
    public http: Http,
    public storage: Storage, 
    public api: ApiProvider, 
    public alertCtrl: AlertController, 
    public camera: Camera,
    public domSanitizer: DomSanitizer, 
    ) {

      (this.navParams.get('id')) ? this.isEdition = true : this.isEdition = false

      this.api.get('food').subscribe(foods => {
        this.foods = foods.data
      })
      this.formComplete = false
      this.userForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*'), Validators.required])],
        breed: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
        profile: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
        food_id: ['', Validators.compose([Validators.maxLength(20),  Validators.required])],
    });


    if(this.isEdition){
      this.api.get('pet/getById/' + this.navParams.get('id')).subscribe(data => {
        this.imgPreview = this.api.getBaseUrl() + 'img/pets/' + data.data.img
      })
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
            this.uploadPhoto()
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












  /*Photo aux functions*/

  openPhotoOptions() {
    this.alertCtrl.create({
      title: 'Seleccionar medio',
      buttons: [{ text: 'Cámara', handler: data => { this.openCam('camera') } }, { text: 'Galería', handler: data => { this.openCam('gallery') } }]
    }).present();
  }
  openCam(source) {
    
  let cameraOptions: CameraOptions;
  if (source === "camera") {
    cameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 500,
      targetHeight: 750
    }

  } else {
    cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 40,
      targetWidth: 500,
      targetHeight: 750,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }


  }

  this.camera.getPicture(cameraOptions)
    .then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData
      this.imgPreview = this.domSanitizer.bypassSecurityTrustUrl(this.base64Image)
    })
  }

  uploadPhoto(){
      let postData = {
        pet_id: this.navParams.get('id'), 
        img: this.base64Image
      }
  
      this.storage.get('is_provider').then(is_provider => {
        this.api.post('pet/profilePicture/' + this.navParams.get('id'), postData).subscribe(data => {
          data = data.json()
          this.api.showNotification(data['message'])
          console.log(data)
        })
      })
    
    

  }


}
