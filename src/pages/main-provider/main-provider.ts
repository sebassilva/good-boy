import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api'
import { OrderProvider } from '../../providers/order/order'
import { MapPage } from '../map/map'
import { OrderInfoModalPage } from '../order-info-modal/order-info-modal';


@IonicPage()
@Component({
  selector: 'page-main-provider',
  templateUrl: 'main-provider.html',
})
export class MainProviderPage {
  orders: any
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public order: OrderProvider) {
      this.getOrders()
  }


  getOrders(){

    this.api.get('provider/orders/active/' + this.order.getUserId()).subscribe(data =>{
      this.orders = data.data
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainProviderPage');
  }

}
