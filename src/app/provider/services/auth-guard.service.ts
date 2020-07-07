import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    var currentUser = this.authService.getUserDetails();
    if (currentUser) {
      // checking the role  and redirecting it to CallFlow page if it is authorised
      if (route.data.roles && route.data.roles.indexOf(currentUser.sid) === -1) {

        this.router.navigate(['dashboard/callflow']);
        return false;
      }
      //Checking whether call flow is selected or not based on URL path
      if (route.routeConfig.path != "usermanagement" && route.routeConfig.path != "callflow") {
        let value = localStorage.getItem('CallFlowId');
        if (!value) {
          this.router.navigate(['dashboard/callflow']);
          return false
        }
        return true;
      }
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
