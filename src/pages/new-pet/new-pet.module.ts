import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPetPage } from './new-pet';

@NgModule({
  declarations: [
    NewPetPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPetPage),
  ],
})
export class NewPetPageModule {}
