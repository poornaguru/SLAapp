import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../provider/services/authentication.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("Token");
        //let currentUser = this.authenticationService.currentUserValue;
        if (idToken) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}