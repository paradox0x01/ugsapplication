import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTimesheetComponent } from './create-timesheet/create-timesheet.component';
import { RapportTimesheetComponent } from './rapport-timesheet/rapport-timesheet.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeModule } from '../prime.module';
import { AuthGuard } from '../core/auth.guard';
import {NzPopconfirmModule} from 'ng-zorro-antd';


const routes: Routes = [
  {path: 'timesheets', component: RapportTimesheetComponent, canActivate: [AuthGuard]},
  {path: 'timesheet/create', component: CreateTimesheetComponent, canActivate: [AuthGuard]},
  {path: 'timesheet/:id/edit', component: EditTimesheetComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    CreateTimesheetComponent,
    RapportTimesheetComponent,
    EditTimesheetComponent,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    NzPopconfirmModule,
    RouterModule.forChild(routes)
  ]
})
export class TimesheetModule { }

