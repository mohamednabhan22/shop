import { AuthServiceService } from '../auth-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  subscription: Subscription;


  constructor(private AuthServiceService:AuthServiceService,private router:Router) { }
  ngOnInit(): void {
    this.subscription =this.AuthServiceService.error.subscribe(err=>this.error=err)
  }

error
  login(form:NgForm){
    console.log(form.value.password)
    let email=form.value.email
    let password=form.value.password

this.AuthServiceService.Login(email,password)}
ngOnDestroy() {
  this.subscription.unsubscribe();
}
  
}

