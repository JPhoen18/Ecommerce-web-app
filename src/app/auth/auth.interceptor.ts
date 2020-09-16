import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UsercredsService} from '../usercreds.service';

import { Router, NavigationEnd } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private usercred : UsercredsService , private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.usercred.getToken())});
            return next.handle(clonedreq).pipe(
                tap( //tap from rxjs
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('');
                        }
                    })
            );
        }
    }
}
