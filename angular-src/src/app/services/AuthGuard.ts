import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './AuthenticationService';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthenticationService,private router:Router){ }

  canActivate(){
    // activate routes if user logged in
    if(!this.authService.isAuthenticate()){
      this.router.navigate(['signIn']);
      return false;
    }
    return true;
  }
}
