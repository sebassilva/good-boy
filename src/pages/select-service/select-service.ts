import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  serviceSelected(service){
    this.order.setService(service)
    this.navCtrl.push(MapPage)
    console.log("Service selected: ")
    console.log(this.order.getService())
  }

}
