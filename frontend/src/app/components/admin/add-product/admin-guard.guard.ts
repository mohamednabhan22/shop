import { AuthServiceService } from './../../auth/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private AuthServiceService:AuthServiceService,private router:Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean  {

      if (this.AuthServiceService.isAdminGuard()){
        console.log('true')
        return true
      } else {
        console.log('false')    
        this.router.navigate([''])        
        return false
      }
  }
  
}
