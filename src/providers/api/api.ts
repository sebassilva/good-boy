import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class ApiProvider {

  baseUrl: string
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
    this.baseUrl = "http://localhost/api"
  }

  get(url){
    return this.http.get('http://localhost/api/' + url).map(res => res.json())
  }

  post(url, data){
    return this.http.post('http://localhost/api/' + url, data)
  }

}