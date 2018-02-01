import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Storage } from '@ionic/storage'
import { NewPetPage } from '../new-pet/new-pet'
import { ProviderLegalsPage } from '../provider-legals/provider-legals'

import { ApiProvider } from '../../providers/api/api'
import { ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import {  ActionSheetController, Platform, LoadingController, Loading } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order'
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userForm: FormGroup
  dogs: any
  newPet: any
  userId: number
  imgPreview: any
  isProvider: boolean

  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public formBuilder: FormBuilder, 
    public storage: Storage, 
    private camera: Camera, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    public domSanitizer: DomSanitizer, 
    public order: OrderProvider) {

    this.newPet = NewPetPage
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
      sharingCode: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
      freeServices: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
      comments: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
    });



    this.storage.get('is_provider').then(is_provider => {
      is_provider ? this.providerConfig() : this.userConfig()
    })



  }


  providerConfig(){
    this.isProvider = true
    this.getProvider()
  }

  userConfig(){
    //Get all the doggos
    this.storage.get('user_id').then(user_id=>{
      console.log('get users')
      this.getUser()
      this.api.post('user/pets', {user_id: user_id})
      .map(response => response.json())
      .subscribe(dogs =>{
        dogs.forEach(dog => dog.img = (dog.img != 'default') ? this.api.getBaseUrl() + 'img/pets/' + dog.img : null)
        this.dogs = dogs
      })

    })

  }



  getUser(){
    this.storage.get('user_id').then(user_id=>{
      this.api.post('user/get', {user_id: user_id})
      .map(response => response.json())
      .subscribe(user=>{
        this.userId = user.id
        this.imgPreview = this.imgPreview ? this.api.getBaseUrl() + 'img/avatars/' +user.img : null
        this.userForm.setValue({
          name: user.name,
          lastname: user.lastname,
          telephone: user.telephone, 
          sharingCode: user.sharingCode, 
          freeServices: user.freeServices, 
          comments: ''
        })
      })
    })
  }


  getProvider(){
    this.storage.get('user_id').then(user_id=>{
      this.api.post('provider/get', {user_id: user_id})
      .map(response => response.json())
      .subscribe(user=>{
        this.userId = user.id
        this.imgPreview = (user.img) ? this.api.getBaseUrl() + 'img/avatars/' + user.img : null
        this.userForm.setValue({
          name: user.name,
          lastname: user.lastname,
          telephone: user.telephone, 
          sharingCode: '', 
          freeServices: '', 
          comments: user.comments

        })
      })
    })
  }
  

  register(){
    let data = this.userForm.value
    data['id'] = this.userId
    let url = (this.isProvider) ? 'provider' : 'user'
    this.api.post(url  + '/edit/' + this.userId, data)
    .map(response => response.json())
    .subscribe(res => {
      this.showNotification(res['message'])
    })
    //if image is selected

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  showNotification(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


  documents(){
    this.navCtrl.push( ProviderLegalsPage )
  }






  editDog(dog){
    this.navCtrl.push( NewPetPage, dog)
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
      let base64Image = 'data:image/jpeg;base64,' + imageData
      this.imgPreview = this.domSanitizer.bypassSecurityTrustUrl(base64Image)
      let postData = {
        user_id: this.order.getUserId(), 
        img: base64Image
      }

      this.storage.get('is_provider').then(is_provider => {
        let url = is_provider ? 'user/profilePicture' : 'provider/profilePicture'
        this.api.post(url + postData.user_id, postData)
        .map(response => response.json())
        .subscribe(data => {
          this.api.showNotification(data.message)
        })
      })

      // let blob = new Blob(imageData, {type: 'image/jpg'})
    })
  }

}
