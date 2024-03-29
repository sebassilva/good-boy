import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api'
import { OrderProvider } from '../../providers/order/order'
import { MapPage } from '../map/map'
import { CurrentOrderPage } from '../current-order/current-order'


@IonicPage()
@Component({
  selector: 'page-main-provider',
  templateUrl: 'main-provider.html',
})
export class MainProviderPage {
  newOrders: any
  currentOrders: any
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public order: OrderProvider) {
      // Promise.all(this.api.update()).then(_ => {
      //   this.getOrders()
      // })
      this.api.update().then(_ => this.getOrders())
  }


  getOrders(){

    this.api.post('provider/orders/active', {user_id: this.order.getUserId()})
    .map(res =>res.json())
    .subscribe(data =>{
      if(data.data)
      this.newOrders = data.data.reverse()
    })

    this.api.post('provider/orders/current', {user_id: this.order.getUserId()})
    .map(res =>res.json())
    .subscribe(data =>{
      if(data.data)
      this.currentOrders = data.data
    })
  }


  accept(orderAccepted){
    let orderInfo = {
      provider_id: this.order.getUserId(), 
      order_id: orderAccepted.id
    }
    console.log(orderInfo)
    this.api.post('provider/orders/accept/' + orderInfo.provider_id, orderInfo).subscribe(data =>{
      data = data.json()
      console.log(data)
      console.log(orderAccepted)
      if(data.status == 0){
        this.navCtrl.setRoot( MapPage, orderAccepted )
      }

      this.api.showNotification(data['message'])
    })
  }

  viewCurrent(order){
    this.navCtrl.push(MapPage, order)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainProviderPage');
  }

}
