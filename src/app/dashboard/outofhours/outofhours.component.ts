import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../provider/services/dashboard.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OutOfHours } from 'src/app/provider/models/outOfHours';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-outofhours',
  templateUrl: './outofhours.component.html',
  styleUrls: ['./outofhours.component.css']
})
export class OutofhoursComponent implements OnInit {
  courseForm: FormGroup;
  submittedOutofHoursValue: OutOfHours;
  constructor(private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService) {
    this.submittedOutofHoursValue = {
      dnBankHoliday: '',
      dnOOH: '',
      id: '',
      enableMessageBankHoliday: null,
      enableMessageOOH: null,
      enableVoicemailRedirectBankHoliday: null,
      enableVoicemailRedirectOOH: null
    };
  }
  ngOnInit() {
    this.createForm();
    this.dashboardService.getOutOfHours().subscribe(
      data => {
        this.courseForm.setValue({
          isOutofhoursmessageEnabled: data.enableMessageOOH,
          isOutofhoursCallEnabled: data.enableVoicemailRedirectOOH,
          enabledoutofhoursMessageNumber: data.dnOOH,
          isHolidayMessageEnabled: data.enableMessageBankHoliday,
          isHolidayCallEnabled: data.enableVoicemailRedirectBankHoliday,
          enabledHolidaysMessageNumber: data.dnBankHoliday,
        });
        this.submittedOutofHoursValue.id = data.id;
      },
      error => {
      });
  }

  createForm() {
    this.courseForm = this.formBuilder.group({
      isOutofhoursmessageEnabled: ['', ''],
      isOutofhoursCallEnabled: ['', ''],
      enabledoutofhoursMessageNumber: ['', ''],
      isHolidayMessageEnabled: ['', ''],
      isHolidayCallEnabled: ['', ''],
      enabledHolidaysMessageNumber: ['', '']
    });
  }

  get f() { return this.courseForm.controls; }

  onSubmit() {
    this.submittedOutofHoursValue.dnOOH = this.courseForm.get('enabledoutofhoursMessageNumber').value;
    this.submittedOutofHoursValue.enableMessageOOH = this.courseForm.get('isOutofhoursmessageEnabled').value;
    this.submittedOutofHoursValue.enableVoicemailRedirectOOH = this.courseForm.get('isOutofhoursCallEnabled').value;
    this.submittedOutofHoursValue.dnBankHoliday = this.courseForm.get('enabledHolidaysMessageNumber').value;
    this.submittedOutofHoursValue.enableMessageBankHoliday = this.courseForm.get('isHolidayMessageEnabled').value;
    this.submittedOutofHoursValue.enableVoicemailRedirectBankHoliday = this.courseForm.get('isHolidayCallEnabled').value;
    this.dashboardService.updateOutOfHours(this.submittedOutofHoursValue).subscribe(
      data => {
        this.toasterService.pop("success", "Out Of Hours", "File has been updated successfully");
      },
      error => {
        this.toasterService.pop("error", "Out Of Hours", "Server error has occured!!!");
      });
  }
}
