import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToasterModule } from 'angular2-toaster';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { CallflowComponent } from './callflow/callflow.component';
import { OpeningTimesComponent } from './opening-times/opening-times.component';
import { MessageComponent } from './message/message.component';
import { OutofhoursComponent } from './outofhours/outofhours.component';
import { HolidaysComponent } from './holidays/holidays.component';

@NgModule({
  declarations: [
    UsermanagementComponent,
    CallflowComponent,
    OpeningTimesComponent,
    MessageComponent,
    OutofhoursComponent,
    HolidaysComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToasterModule.forRoot(),
    DashboardRoutingModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
  ],
  entryComponents: [

  ]
})
export class DashboardModule { }
