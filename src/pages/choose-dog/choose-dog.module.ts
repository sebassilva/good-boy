import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseDogPage } from './choose-dog';

@NgModule({
  declarations: [
    ChooseDogPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseDogPage),
  ],
})
export class ChooseDogPageModule {}
