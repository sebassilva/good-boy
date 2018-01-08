import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderInfoModalPage } from './order-info-modal';

@NgModule({
  declarations: [
    OrderInfoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderInfoModalPage),
  ],
})
export class OrderInfoModalPageModule {}
