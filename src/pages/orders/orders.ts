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

    orders: any  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public order: OrderProvider, 
    public api: ApiProvider) {

      this.api.get('order/all/' + this.order.getUserId()).subscribe(data =>{
        console.log(data)
        this.orders = data.data
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
