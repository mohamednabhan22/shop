import { AuthServiceService } from './../auth-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  subscription: Subscription;

  constructor(private AuthServiceService:AuthServiceService,private router:Router) { }
  error
  ngOnInit(): void {
  }
  signup(form){
    console.log(form.value.password)
    let username=form.value.username
    let email=form.value.email

    let password=form.value.password
    let confirmPassword=form.value.confirmPassword

    this.subscription =this.AuthServiceService.Signup(username,email,password,confirmPassword).subscribe(
  (res)=>{console.log(res)
    this.router.navigate(['/auth'])
},
(err)=>{console.log(err)
this.error=err
}
)

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
