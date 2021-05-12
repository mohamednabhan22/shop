import { AuthServiceService } from './auth-service.service';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private AuthServiceService:AuthServiceService,private router:Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean | UrlTree  {

      if (this.AuthServiceService.isLoggedIn()){
        console.log('true')
        return true
      } else {
       console.log('false')    
       //return this.router.createUrlTree(['/auth']);

        this.router.navigate(['login'])        
       return false
      }

  }
 
}
