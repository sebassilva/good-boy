import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseDogPage } from '../choose-dog/choose-dog';


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }


  next(){
    //TODO: Validate a location has been selected, 
    //TODO: put marker on map
    //TODO: lookf for address
    this.navCtrl.push(ChooseDogPage)
    
  }
}
