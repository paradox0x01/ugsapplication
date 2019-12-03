import { Component, OnInit, NgModule, LOCALE_ID } from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {Timesheet} from '../../shared/timesheet';
import {TimesheetService} from '../../core/timesheet.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import {NzMessageService} from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import * as moment from 'moment';

@Component({
  selector: 'app-rapport-timesheet',
  templateUrl: './rapport-timesheet.component.html',
  styleUrls: ['./rapport-timesheet.component.scss'],
  providers: [MessageService,
              ConfirmationService,
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    }],
})
export class RapportTimesheetComponent implements OnInit {
  private timesheetSub: Subscription;
  private timesheet$ : Observable<Timesheet[]>;
  private today = Date.now();
  public date: Date;
  public moment = moment(this.today).startOf("day").format();
  constructor(private timesheetService: TimesheetService,
              private nzMessageService: NzMessageService,
              ) {}

  ngOnInit() {
    this.timesheetSub = this.timesheetService.getReportByDay(this.moment).subscribe();
    this.timesheet$ =  this.timesheetService.timesheetByDayUpdateListener();
  }

  confirm(id: any) {
    this.timesheetService.delTimesheet(id).subscribe();
    this.nzMessageService.info('Suppression reussite !');
  }

  cancel(): void {
    this.nzMessageService.info('Opération annulé !');
  }

  ngOnDestroy(): void {
    this.timesheetSub.unsubscribe();
  }

}
