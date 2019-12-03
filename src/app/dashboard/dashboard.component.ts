import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../core/employe.service';
import { Employe } from '../shared/employe';
import {PermissionService} from '../core/permission.service';
import {Permission} from '../shared/permission';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import {Observable} from 'rxjs';
import {TimesheetService} from "../core/timesheet.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Employes: Employe[];
  Event = [];
  options: any;
  countGardiens: Number;
  countStaffs: Number;
  private countPermission: number;
  private countTimesheet: number;
  constructor(private employeService: EmployeService,
              private permissionService: PermissionService,
              private timesheetService: TimesheetService) { }

  ngOnInit() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin],
      defaultDate: Date.now(),
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      height: 500,
      locales: [ frLocale ],
      locale: 'fr'
    };

    this.permissionService.getPermissionEvent()
      .subscribe(event => {
        this.Event = event;
        console.log(this.Event);
      });

     this.employeService.getEmployees()
       .subscribe((gardiens) => {
         this.countGardiens = gardiens.length;
       });

    // Get staff count
    this.employeService.getStaffs()
      .subscribe((staff) => {
        this.countStaffs = staff.length;
      });
    
    // Get permissions count
    this.permissionService.getStaff()
      .subscribe((permission) => {
        this.countPermission = permission.length;
      });
    
    this.timesheetService.getAbsent()
      .subscribe((timesheet) => {
        this.countTimesheet = timesheet.length
      })
  }
  
}
