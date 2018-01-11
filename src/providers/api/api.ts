import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { ToastController } from 'ionic-angular';

@Injectable()
export class ApiProvider {

  baseUrl: string
  constructor(public http: Http, public toastCtrl: ToastController) {
    console.log('Hello ApiProvider Provider');
    this.baseUrl = "http://booxlab.com/goodboy/api/"
  }

  get(url){
    return this.http.get(this.baseUrl+ url).map(res => res.json())
  }

  post(url, data){
    return this.http.post(this.baseUrl+ url, data)
  }


  showNotification(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();  
  }


}
