import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import {UsercredsService} from '../usercreds.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usercred : UsercredsService, private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.usercred.isLoggedIn()) {
        //check to make sure if the user is logged in, or basically if
        //the token is expired or not. If token is expired, navigate to signin
        this.router.navigateByUrl('');
        this.usercred.deleteToken();
      }
    return true;
  }
}
