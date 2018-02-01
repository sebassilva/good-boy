import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';
import { OrdersPage } from '../orders/orders'
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  newOrder: any


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public order: OrderProvider, 
    public api: ApiProvider, 
    public storage: Storage) {
      this.newOrder = {
        user_id: '', 
        pets: [], 
        service: {}, 
        payment: '', 
        location: {}, 
        address: '', 
        email: ''
     }
      this.storage.get('email').then(email => {
        this.newOrder = this.order.getOrder()
        this.newOrder.email = email
        console.log(this.newOrder)
      })
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }


  placeOrder(){
    console.log('Order is being placed')
    // this.api.post('order/new', this.newOrder)
    // .map(response => response.json())
    // .subscribe(data => {      
    //  if(data.status == 0){
       //Order has been placed in server but havent started checkout
        this.openCheckout()
    //  }
    // })
  }


  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_w8JSfhJIp6WKdbiSeQm8MFK7',
      locale: 'auto',
      token:  (token: any) =>  {
        this.newOrder['token'] = token
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.api.post('order/new', this.newOrder).subscribe(res =>{
          this.navCtrl.setRoot(OrdersPage)
          console.log(res);
        })
        console.log(token)
      }
    });

    handler.open({
      name: 'GoodBoy!',
      description: this.newOrder.service.name,
      amount: Number(this.newOrder.service.cost) * 100, 
      locale: 'es', 
      image: '', 
      allowRememberMe: true, 
      label: 'Pagar ahora',
      currency: 'mxn', 
      email: this.newOrder.email
    });

  }

}
