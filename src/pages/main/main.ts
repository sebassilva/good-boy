import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewPetPage } from '../new-pet/new-pet';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public order: OrderProvider) {

      console.log()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  newPet(){
    this.navCtrl.push(NewPetPage)
  }

}
