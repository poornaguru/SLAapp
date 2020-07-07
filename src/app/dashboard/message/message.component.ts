import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../provider/services/dashboard.service';
import { messageOfTheDay } from '../../provider/models/messageOfTheDay';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageCountArray: number[] = [];
  messageRequiredArray: number[] = [];
  selectedDropdownValue: number;
  message: messageOfTheDay;
  constructor(private dashboardService: DashboardService,
    private toasterService: ToasterService) {
  }
  ngOnInit() {
    this.dashboardService.getMessageDetails().subscribe(
      data => {
        this.message = data;
        this.messageCountArray = this.arrayValue(this.message.motdCounter);
        this.selectedDropdownValue = this.message.motdCounter;
        this.messageRequiredArray = this.messageCountArray;
      },
      error => {
      });
  }

  OnSaveClick() {
    this.messageRequiredArray = this.arrayValue(this.message.motdCounter);
    this.dashboardService.updateMessageDetails(this.message).subscribe(
      data => {
        this.toasterService.pop("success", "Message of the Day", "File has been updated successfully");
      },
      error => {
        this.toasterService.pop("error", "Message of the Day", "Server error has occured!!!");
      });
  }

  OnDropDownChange(value: string) {
    this.message.motdCounter = Number(value);
    this.messageCountArray = this.arrayValue(Number(value));
  }

  onMessageDayChange(messageNumber) {
    this.message.motdMessage = messageNumber;
  }

  arrayValue(maxLimit) {
    let arrayCount: number[] = [];
    let i = 1;
    while (i <= maxLimit) {
      arrayCount.push(i);
      i++;
    }
    return arrayCount;
  }
}
