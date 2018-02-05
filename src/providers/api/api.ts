import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map'
import { ToastController } from 'ionic-angular';
import { environment } from '../../environments/environment'

@Injectable()
export class ApiProvider {

  apiUrl: string
  baseUrl: string
  user_id: string
  api_token: string
  user_type: string
  constructor(public http: Http, public toastCtrl: ToastController, public storage: Storage) {
    console.log('Hello ApiProvider Provider');
    this.apiUrl = environment.apiUrl
    this.baseUrl = environment.baseUrl

    this.storage.get('user_id').then(user_id =>{
      this.user_id = user_id
    })
    this.storage.get('api_token').then(api_token =>{
      this.api_token = api_token
    })
    this.storage.get('is_provider').then(is_provider =>{
      this.user_type = is_provider ? 'provider' : 'user'
    })
  }

  get(url){
    return this.http.get(this.apiUrl+ url).map(res => res.json())
  }

  post(url, data){
    console.log(this.api_token, this.user_id)
    let headers = new Headers();
    if(this.api_token){
      headers.append('Token', this.api_token)
      headers.append('User', this.user_id)
      headers.append('Type', this.user_type)
    }
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + url, data, options)
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

  
  update(){
    return Promise.all([
    this.storage.get('user_id').then(user_id => this.user_id = user_id), 
    this.storage.get('api_token').then(api_token => this.api_token = api_token), 
    this.storage.get('is_provider').then(is_provider => this.user_type = is_provider ? 'provider' : 'user')
  ])

  }

  
}
