import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-order-info-modal',
  templateUrl: 'order-info-modal.html',
})
export class OrderInfoModalPage {

  order: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    let order = {
      isProvider: this.navParams.get('isProvider'),
      id: this.navParams.get('id'),
      address: this.navParams.get('address'), 
      lat: this.navParams.get('lat'), 
      lng: this.navParams.get('lng'), 
      pet: this.navParams.get('pet'), 
      service: this.navParams.get('service'), 
    }
    this.order = order
  }


  cancel() {
    this.viewCtrl.dismiss();
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderInfoModalPage');
  }

}
