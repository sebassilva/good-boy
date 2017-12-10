import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CurrencyPipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';


@IonicPage()
@Component({
  selector: 'page-select-service',
  templateUrl: 'select-service.html',
})
export class SelectServicePage {

  services: any
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public api: ApiProvider, 
    public order: OrderProvider) {
    this.api.get('service').subscribe(data => {
      this.services = data.data
    });
    //   this.api.get('http://localhost/api/service').map(res => res.json()).subscribe(data => {
    //     this.services = data.data;
    //     console.log(this.services)
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectServicePage');
  }

  serviceSelected(id){
    this.order.setServiceId(id)
    console.log("Service selected: " + this.order.getServiceId())
  }

}
