import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Storage } from '@ionic/storage'
import { NewPetPage } from '../new-pet/new-pet'
import { ApiProvider } from '../../providers/api/api'
import { ToastController } from 'ionic-angular';


import {  ActionSheetController, Platform, LoadingController, Loading } from 'ionic-angular';
 
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

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

  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public formBuilder: FormBuilder, 
    public storage: Storage, 
    private camera: Camera, 
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController) {

    this.newPet = NewPetPage
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telephone: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
      sharingCode: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
      freeServices: ['', Validators.compose([Validators.maxLength(12),  Validators.required])],
    });

    this.storage.get('user_id').then(user_id=>{
      this.api.get('user/' + user_id).subscribe(user=>{
        this.userId = user.id
        this.userForm.setValue({
          name: user.name,
          lastname: user.lastname,
          //lastname: user.lastname, 
          telephone: user.telephone, 
          sharingCode: user.sharingCode, 
          freeServices: user.freeServices

        })
      })

      //Get all the doggos
      this.api.get('user/pets/' + user_id).subscribe(dogs =>{
        console.log(dogs)
        this.dogs = dogs
      })
      
    })
  }


  register(){
    let data = this.userForm.value
    data['id'] = this.userId
    this.api.post('user/edit/' + this.userId, data).subscribe(res => {
      res = res.json()
      this.showNotification(res['message'])
    })
    //if image is selected
    this.uploadImage()

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


















  /*upload image functions */

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }



  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
   
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  
  public uploadImage() {
    // Destination URL
    var url = "http://yoururl/upload.php";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    const fileTransfer: TransferObject = this.transfer.create();
   
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }
}
