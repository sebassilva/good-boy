import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  newOrder: object
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public order: OrderProvider, 
    public api: ApiProvider) {

      this.newOrder = this.order.getOrder()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}