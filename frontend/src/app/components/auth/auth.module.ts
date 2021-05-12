import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import {sharedModule}from'../../shared/shared.module'


@NgModule({
  declarations: [SignupComponent,LoginComponent],
  imports: [
    AuthRoutingModule,sharedModule
  ]
})
export class AuthModule { }
