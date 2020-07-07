import { NgModule } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AlertService } from './services/alert.service';
import { DashboardService } from './services/dashboard.service';

@NgModule({
    imports: [

    ],
    providers: [
        AuthenticationService,
        AuthGuardService,
        AlertService,
        DashboardService
    ]
})
export class ProvidersModule { }
