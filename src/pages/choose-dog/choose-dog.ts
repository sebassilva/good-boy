import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { OrderProvider } from '../../providers/order/order';
import { ResumePage } from '../resume/resume';


@IonicPage()
@Component({
  selector: 'page-choose-dog',
  templateUrl: 'choose-dog.html',
})
export class ChooseDogPage {
  dogs: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public order: OrderProvider) {

      this.api.get('user/pets/' + this.order.getUserId()).subscribe(data =>{
        this.dogs = data
        console.log(this.dogs)
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseDogPage');
  }

  dogSelected(id){
    console.log('dog selected: ' + id)
    this.order.setPets(id)
    this.navCtrl.push(ResumePage)
  }

}
