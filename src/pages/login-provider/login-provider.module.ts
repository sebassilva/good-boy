import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginProviderPage } from './login-provider';

@NgModule({
  declarations: [
    LoginProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginProviderPage),
  ],
})
export class LoginProviderPageModule {}
