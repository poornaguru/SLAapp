import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../provider/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  callFlow: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedUser();
  }

  isCallFlowSelected() {
    let value = localStorage.getItem('CallFlowName');
    if (value) {
      this.callFlow = value;
      return true;
    }
    return false;
  }

}
