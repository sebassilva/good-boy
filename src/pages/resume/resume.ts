import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';



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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }

  placeOrder(){
    console.log('Order is being placed')
    this.api.post('order/new', this.newOrder)
  }

}
