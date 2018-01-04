import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeProviderPage } from './home-provider';

@NgModule({
  declarations: [
    HomeProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeProviderPage),
  ],
})
export class HomeProviderPageModule {}
