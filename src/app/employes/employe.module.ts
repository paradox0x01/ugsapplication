import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeComponent } from './create-employe/create-employe.component';
import { ListesEmployesComponent } from './listes-employes/listes-employes.component';
import { DetailsEmployeComponent } from './details-employe/details-employe.component';
import { EditEmployeComponent } from './edit-employe/edit-employe.component';
import { PrimeModule } from '../prime.module';
import { AuthGuard } from '../core/auth.guard';
import {NzPopconfirmModule} from 'ng-zorro-antd';

const routes: Routes = [
  {path: 'employe/create', component: CreateEmployeComponent, canActivate: [AuthGuard]},
  {path: 'employes', component: ListesEmployesComponent},
  {path: 'employe/:id', component: DetailsEmployeComponent, canActivate: [AuthGuard]},
  {path: 'employe/:id/edit', component: EditEmployeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    EditEmployeComponent,
    ListesEmployesComponent,
    DetailsEmployeComponent,
    CreateEmployeComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild(routes),
    NzPopconfirmModule
  ]
})
export class EmployeModule { }
