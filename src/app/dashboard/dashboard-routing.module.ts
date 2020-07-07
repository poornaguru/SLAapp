import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { CallflowComponent } from './callflow/callflow.component';
import { AuthGuardService as AuthGuard } from '../provider/services/auth-guard.service';
import { OpeningTimesComponent } from './opening-times/opening-times.component';
import { MessageComponent } from './message/message.component';
import { OutofhoursComponent } from './outofhours/outofhours.component'
import { HolidaysComponent } from './holidays/holidays.component';

const routes: Routes = [
  {
    path: 'dashboard',
    resolve: {
    },
    children: [
      {
        path: 'usermanagement',
        component: UsermanagementComponent,
        canActivate: [AuthGuard],
        data: { roles: ["01", "03", "06"] }
      },
      {
        path: 'callflow',
        component: CallflowComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'openingtimes',
        component: OpeningTimesComponent,
        canActivate: [AuthGuard],
        data: { isCallFlowSelected: localStorage.getItem('CallFlowId') }
      }, {
        path: 'message',
        component: MessageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'outofhours',
        component: OutofhoursComponent,
        canActivate: [AuthGuard],
      }, {

        path: 'holidays',
        component: HolidaysComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
