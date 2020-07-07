import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../provider/services/dashboard.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  users: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getUserManagementDetails().subscribe(
      data => {
        this.users = data;
      },
      error => {
      });
  }

}
