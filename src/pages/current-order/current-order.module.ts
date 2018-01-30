import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentOrderPage } from './current-order';

@NgModule({
  declarations: [
    CurrentOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentOrderPage),
  ],
})
export class CurrentOrderPageModule {}
