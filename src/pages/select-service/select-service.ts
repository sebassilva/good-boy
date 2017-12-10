import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CurrencyPipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';
import { MapPage } from '../map/map';


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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectServicePage');
  }

  serviceSelected(id){
    this.order.setServiceId(id)
    this.navCtrl.push(MapPage)
    console.log("Service selected: " + this.order.getServiceId())
  }

}
