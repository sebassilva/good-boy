import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import { ApiProvider } from '../../providers/api/api'
import { DomSanitizer } from '@angular/platform-browser';
import { OrderProvider } from '../../providers/order/order'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-provider-legals',
  templateUrl: 'provider-legals.html',
})
export class ProviderLegalsPage {

  docs: any
  imgPreview: any
  currentPictureId: number
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public camera: Camera, 
    public alertCtrl: AlertController, 
    public domSanitizer: DomSanitizer, 
    public storage: Storage, 
    public api: ApiProvider, 
    public order: OrderProvider) {

      this.docs = [
        {id: 1, name: 'Identificación', description: '', status: false, img: '', comments: ''},
        {id: 2, name: 'Certificado de no antecedentes penales', description: '', status: false, img: '', comments: ''},
        {id: 3, name: 'Comprobante de domicilio', description: '', status: false, img: '', comments: ''},
      ]
      console.log(this.docs)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderLegalsPage');
  }

















  /*Photo aux functions*/

  openPhotoOptions(id) {
    this.currentPictureId = id
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
        img_id: this.currentPictureId,
        img: base64Image
      }

      this.storage.get('is_provider').then(is_provider => {
        this.api.post('provider/legaldocs/' + postData.user_id, postData).subscribe(data => {
          data = data.json()
          this.api.showNotification(data['message'])
          console.log(data)
        })
      })

      // let blob = new Blob(imageData, {type: 'image/jpg'})
    })
  }

  
}
