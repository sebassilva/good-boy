import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login: any;
  register: any;
  constructor(public navCtrl: NavController) {
    this.login = LoginPage;
    this.register = RegisterPage;
  }

}
