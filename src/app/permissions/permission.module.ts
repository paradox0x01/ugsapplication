import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';
import { RouterModule, Routes } from '@angular/router';
import { ListePermissionComponent } from './liste-permission/liste-permission.component';
import { PrimeModule } from '../prime.module';
import {AuthGuard} from '../core/auth.guard';
import {NzPopconfirmModule} from 'ng-zorro-antd';


const routes: Routes = [
  {path: 'createpermission', component: CreatePermissionComponent, canActivate: [AuthGuard]},
  {path: 'permissions', component: ListePermissionComponent, canActivate: [AuthGuard] },
  {path: 'permissions/:id/edit', component: EditPermissionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [CreatePermissionComponent, EditPermissionComponent, ListePermissionComponent],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild(routes),
    NzPopconfirmModule
  ]
})
export class PermissionModule { }
