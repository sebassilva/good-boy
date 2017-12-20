import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';
import { OrdersPage } from '../orders/orders'


@IonicPage()
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  newOrder: object
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public order: OrderProvider, 
    public api: ApiProvider) {

      this.newOrder = this.order.getOrder()
      console.log(this.newOrder)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }

  placeOrder(){
    console.log('Order is being placed')
    this.api.post('order/new', this.newOrder)
    .subscribe(data => {
      data = JSON.parse(data['_body'])
      
     if(data.status == 0){
        this.navCtrl.setRoot(OrdersPage)
     }
    })
  }

}
