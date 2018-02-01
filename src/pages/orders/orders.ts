import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';
import { Storage } from '@ionic/storage'
import { CurrentOrderPage } from '../current-order/current-order'

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
    public api: ApiProvider, 
    public storage: Storage) {

      this.storage.get('is_provider').then(is_provider =>{
        let url = is_provider ? 'provider/orders/finished/' : 'order/all/'
        this.api.post(url + this.order.getUserId(), {user_id: this.order.getUserId()})
        .map(response => response.json())
        .subscribe(data =>{
          if(this.currentOrders)
            this.currentOrders = data.data.filter((order) => order.status_id < 6).reverese()
            this.finishedOrders = data.data.filter((order) => order.status_id >= 6).reverse()
        })
      })

     
    }


    viewCurrentOrder(order){
      this.navCtrl.push(CurrentOrderPage, order)

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
