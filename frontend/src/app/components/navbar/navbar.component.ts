import { AuthServiceService } from './../auth/auth-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  subscription: Subscription;

  togleShow:boolean=true
  isLoged
  isAdmin

  constructor(public translate: TranslateService,private AuthServiceService:AuthServiceService) { }
  
  useLanguage(language: string) {
    this.translate.use(language);
    this.togleShow=!this.togleShow
    this.AuthServiceService.toglleShow(this.togleShow)
    
}
  ngOnInit(): void {
    this.subscription=this.AuthServiceService.isloged.subscribe(s=>{this.isLoged=s
console.log(s)
})

this.AuthServiceService.isAdmin.subscribe(s=>{this.isAdmin=s
  console.log(s)
  })
  }
  
  logout(){
    this.AuthServiceService.logout()
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
