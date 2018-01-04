import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterProviderPage } from './register-provider';

@NgModule({
  declarations: [
    RegisterProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterProviderPage),
  ],
})
export class RegisterProviderPageModule {}
