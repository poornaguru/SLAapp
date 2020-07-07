import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/provider/services/dashboard.service';
import { BankHolidayDetails, BankHolidayEnabled, BankHolidayData } from 'src/app/provider/models/bankHolidayDetails';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  bankHolidayEnabled: BankHolidayEnabled;
  bankHolidayDetails: BankHolidayDetails;
  callFlowId: string;
  mainArray = [];
  holidaycount: number;
  constructor(private dashboardService: DashboardService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.callFlowId = localStorage.getItem("CallFlowId");
    this.getHolidays();

    /* this.holidayservice.GetHolidayDetails().subscribe(
       data => this.Holiday = data );*/

  }
  Remove(a) {
    this.mainArray.splice(a, 1);
  }

  getHolidays() {
    this.dashboardService.getHolidays(this.callFlowId).subscribe((data: any) => {
      this.bankHolidayEnabled = data[0];
      this.bankHolidayDetails = data[1];
      this.consructdata(data[1]);
      this.holidaycount = this.bankHolidayEnabled.holidayCounter;
      error => {

      }

    });
  }

  consructdata(data: BankHolidayDetails) {
    let result = [];
    for (let i = 0; i < data.bankHoliday.length; i++) {

      result[i] = {
        date: this.formatDate(data.bankHoliday[i].text),
        textopen: data.bankHolidayOpen[i].text,
        textclose: data.bankHolidayClose[i].text,
        closed: data.bankHolidayClosed[i].text == "on" ? true : false
      }

    }
    this.mainArray = result;
  }

  AddHoliday() {
    if (this.mainArray.length < this.holidaycount) {
      this.mainArray.push(
        {
          date: "",
          textopen: "",
          textclose: "",
          closed: false
        }

      );
    }
    else {
      alert("Maximum no. holiday's for this CallFlow is " + this.holidaycount);
    }
  }

  makeRequestData(inputData: any[]) {
    let outputData: BankHolidayDetails = new BankHolidayDetails();
    let bankHoliday: BankHolidayData[] = [];
    let bankHolidayOpen: BankHolidayData[] = [];
    let bankHolidayClose: BankHolidayData[] = [];
    let bankHolidayClosed: BankHolidayData[] = [];
    for (let i = 0; i < inputData.length; i++) {
      bankHoliday.push({ id: i < 9 ? "0" + (i + 1) : (i + 1).toString(), text: this.reverseformate(inputData[i].date) });

      bankHolidayOpen.push({ id: i < 9 ? "0" + (i + 1) : (i + 1).toString(), text: inputData[i].textopen });

      bankHolidayClose.push({ id: i < 9 ? "0" + (i + 1) : (i + 1).toString(), text: inputData[i].textclose });

      bankHolidayClosed.push({ id: i < 9 ? "0" + (i + 1) : (i + 1).toString(), text: inputData[i].closed == true ? "on" : "off" });
    }
    outputData.bankHoliday = bankHoliday;
    outputData.bankHolidayClose = bankHolidayClose;
    outputData.bankHolidayOpen = bankHolidayOpen;
    outputData.bankHolidayClosed = bankHolidayClosed;

    return outputData;
  }

  formatDate(date: string) {
    let datearr = date.split('/');
    return datearr[2] + "-" + datearr[1] + "-" + datearr[0];
  }

  reverseformate(date: string) {
    let date1 = date.split('-');
    return date1[2] + "/" + date1[1] + "/" + date1[0];
  }

  updateHolidays() {
    let newBankHolidayDetails = this.makeRequestData(this.mainArray);
    //this.newBankHolidayDetails = this.bankHolidayDetails; //updated holidays list to be assigned to newBankHolidaysDetails
    this.dashboardService.updateHolidays(newBankHolidayDetails, this.callFlowId).subscribe(data => {
      this.toasterService.pop("success", "holidays", "File has been updated successfully");
    },
      error => {
        this.toasterService.pop("error", "holidays", "Server error has occured!!!");
      }
    );
    this.dashboardService.UpdateBankHolidayEnabled(this.bankHolidayEnabled).subscribe();
  }

}