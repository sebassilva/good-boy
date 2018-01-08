import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainProviderPage } from './main-provider';

@NgModule({
  declarations: [
    MainProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(MainProviderPage),
  ],
})
export class MainProviderPageModule {}
