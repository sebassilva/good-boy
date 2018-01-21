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

    currentOrders: any  
    finishedOrders: any  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public order: OrderProvider, 
    public api: ApiProvider) {

      this.api.get('order/all/' + this.order.getUserId()).subscribe(data =>{
        this.currentOrders = data.data.filter((order) => order.status_id < 6)
        this.finishedOrders = data.data.filter((order) => order.status_id >= 6)
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
