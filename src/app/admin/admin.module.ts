import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {PrimeModule} from '../prime.module';
import {AuthGuard} from '../core/auth.guard';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild(routes),
    FlexLayoutModule
  ]
})
export class AdminModule { }
