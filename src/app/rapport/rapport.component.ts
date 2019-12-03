import { Component, OnInit } from '@angular/core';
import {PermissionService} from "../core/permission.service";
import {TimesheetService} from "../core/timesheet.service";
import {Timesheet} from "../shared/timesheet";
import {EmployeService} from "../core/employe.service";
import {Observable} from 'rxjs';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

  private countPermission: Number;
  private countTimesheet: {countAbsent: Number, countPresent: Number};
  public countPresent: Number;
  public timesheet: Timesheet[] = [];
  public countAbsent: Number;
  private countEmployePresence: Number;
  private countEmployeAbsence: Number;
  public start: Date;
  public end: Date;
  public startDate: Date;
  public endDate: Date;
  public dateDebut: Date;
  public dateFin: Date;
  public employe: string;
  public employ: string;
  public date = Date.now();
  public start2: Date;
  public end2 : Date;
  view = Boolean;
  collectionSize = this.timesheet.length;
  private employe$: Observable<string[]>;

  constructor(private permissionService: PermissionService,
              private employeService: EmployeService,
              private timesheetService: TimesheetService) { }

  ngOnInit() {
    this.employe$ = this.employeService.Employe$;
  }

  getReportPermission(startDate: Date, endDate: Date) {
    this.permissionService.getCountPermission(startDate, endDate)
      .subscribe(count => {
        this.countPermission = count;
        console.log(this.countPermission);
      })
  }

  getReportTimesheet(dateDebut: Date, dateFin: Date) {
    this.timesheetService.getReportTimesheet(dateDebut, dateFin)
      .subscribe((count: {countAbsent: Number, countPresent: Number}) => {
        this.countPresent = count.countPresent;
        this.countAbsent = count.countAbsent;
        console.log(this.countTimesheet);
      } )
  }

  getReportCountEmploye(employe: String, start2: Date, end2: Date): void {
    this.timesheetService.getSingleReportCount(employe, start2, end2)
      .subscribe((count: {countEmployeAbsence: Number, countEmployePresence: Number}) => {
        this.countEmployePresence = count.countEmployePresence;
        this.countEmployeAbsence = count.countEmployeAbsence;
      });
  }

  getSingleRapport(employ: String, start3: Date, end3: Date): void {
    this.timesheetService.getSingleReport(employ, start3, end3)
      .subscribe((timesheet: Timesheet[]) => {
        this.timesheet = timesheet;
        console.log(this.timesheet);
        this.timesheetService.getSelectTimesheet()
          .subscribe((timesheet: Timesheet[]) => {
            this.timesheet = timesheet;
            console.log(this.timesheet);
          });
      });

  }
}
