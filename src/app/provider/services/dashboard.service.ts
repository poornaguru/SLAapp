import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { messageOfTheDay } from '../models/messageOfTheDay';
import { OpeningTimes } from '../models/openingTimes';
import { BankHolidayDetails, BankHolidayEnabled } from '../models/bankHolidayDetails';
import { OutOfHours } from '../models/outOfHours';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private serviceUrl = "https://localhost:44362/api/";
  userCredentials: User;

  constructor(private http: HttpClient) { }

  getUserManagementDetails(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + "UserManagement")
      .pipe(map(user => {
        return user
      }));
  }

  getTeams(): Observable<any> {
    let teamName = this.http.get(this.serviceUrl + "CallFlow/Teams");
    let callFlow = this.http.get(this.serviceUrl + "CallFlow");
    return forkJoin([teamName, callFlow]).pipe(map((respone: any) => {
      return respone;
    }));
  }

  getOpeningTimes(callFlowId: string): Observable<any> {
    return this.http.get(this.serviceUrl + "OpeningTimes?callFlowId=" + callFlowId)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  updateOpeningTimes(openingTimesModel: OpeningTimes): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.serviceUrl + "OpeningTimes", openingTimesModel, { headers: headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getMessageDetails(): Observable<any> {
    let callFlowId = { 'callFlowId': localStorage.getItem('CallFlowId') }
    return this.http.get<any>(this.serviceUrl + "MessageOfTheDay", { params: callFlowId })
      .pipe(map(data => {
        return data
      }));
  }



  updateMessageDetails(messageModel: messageOfTheDay) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.serviceUrl + "MessageOfTheDay", messageModel, { headers: headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getHolidays(callFlowId: string): Observable<any> {
    let bankHolidayEnabled = this.http.get(this.serviceUrl + "BankHoliday/BankHolidayEnabled?callFlowId=" + callFlowId);
    let bankHolidayDetails = this.http.get(this.serviceUrl + "BankHoliday/BankHolidayDetails?callFlowId=" + callFlowId);
    return forkJoin([bankHolidayEnabled, bankHolidayDetails]).pipe(map((response: any) => {
      return response;
    }));
  }

  updateHolidays(bankHolidayDetails: BankHolidayDetails, callFlowId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.serviceUrl + "BankHoliday?callFlowId=" + callFlowId, bankHolidayDetails, { headers: headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  UpdateBankHolidayEnabled(bankHolidayEnabled: BankHolidayEnabled) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.serviceUrl + "BankHoliday/BankHolidayEnabled", bankHolidayEnabled, { headers: headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getOutOfHours(): Observable<any> {
    let callFlowId = { 'callFlowId': localStorage.getItem('CallFlowId') }
    return this.http.get<any>(this.serviceUrl + "OutOfHours", { params: callFlowId })
      .pipe(map(data => {
        return data
      }));
  }

  updateOutOfHours(outOfHoursModel: OutOfHours) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.serviceUrl + "OutOfHours", outOfHoursModel, { headers: headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }
}