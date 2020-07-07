import { Component } from '@angular/core';
import { DashboardService, } from '../app/provider/services/dashboard.service';
import { AuthenticationService } from '../app/provider/services/authentication.service';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SLAapplication';
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: false,
      timeout: 2000
    });
  callFlow: string;
  constructor(private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router) { }
  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedUser();
  }

  isAdminUser(): boolean {
    return this.authenticationService.isAdminUser();
  }

  isCallFlowSelected() {
    let value = localStorage.getItem('CallFlowId');
    if (value) {
      return false;
    }
    return true;
  }
}
