import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
export const TOKEN_NAME: string = 'jwt_token';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private serviceUrl = '';
  userCredentials: User;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
  }

  getUserDetails() {
    var retrievedObject = localStorage.getItem('CurrentUser');
    return JSON.parse(retrievedObject);
  }

  login(username, password) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let encodedUsername = btoa(username);
    let encodedPassword = btoa(password);
    this.userCredentials = { UserName: encodedUsername, Password: encodedPassword };
    return this.http.post<any>("https://localhost:44362/api/Login", this.userCredentials, { headers: headers })
      .pipe(map(user => {
        let token = "";
        token = jwt_decode(user.token);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('CurrentUser', JSON.stringify(token));
        localStorage.setItem('Token', user.token);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Token');
    localStorage.removeItem('CallFlowId');
    localStorage.removeItem('CallFlowName');
  }

  isLoggedUser() {
    let value = localStorage.getItem('Token');
    let href = this.router.url;
    if (value) {
      if (href == "/login") {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  isAdminUser() {
    let userdetails = this.getUserDetails();
    if (userdetails.sid == "01" || userdetails.sid == "03" || userdetails.sid == "06") {
      return true;
    }
    return false;
  }
}