import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { ToastController } from 'ionic-angular';

@Injectable()
export class ApiProvider {

  apiUrl: string
  baseUrl: string
  constructor(public http: Http, public toastCtrl: ToastController) {
    console.log('Hello ApiProvider Provider');
    this.apiUrl = "http://booxlab.com/goodboy/api/"
    this.baseUrl = "http://booxlab.com/goodboy/"
    // this.apiUrl = "http://localhost/api/" 
    // this.baseUrl = "http://localhost/"
  }

  get(url){
    return this.http.get(this.apiUrl+ url).map(res => res.json())
  }

  post(url, data){
    return this.http.post(this.apiUrl+ url, data)
  }


  showNotification(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();  
  }

  getBaseUrl(){
    return this.baseUrl
  }


}
