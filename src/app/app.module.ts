import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeModule } from './employes/employe.module';
import { PermissionModule } from './permissions/permission.module';
import { TimesheetModule } from './timesheets/timesheet.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NofoundComponent } from './nofound/nofound.component';
import {AuthModule} from './auth/auth.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import {AdminModule} from './admin/admin.module';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';
import { NgZorroAntdModule, NZ_I18N, fr_FR, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {RapportsModule} from './rapport/rapports.module';

const ngZorroConfig: NzConfig = {
  message: { nzTop: 60 },
  notification: { nzTop: 240 }
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NofoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgbModule,
    ButtonModule,
    AuthModule,
    PanelModule,
    EmployeModule,
    PermissionModule,
    AdminModule,
    RapportsModule,
    TimesheetModule,
    AppRoutingModule,
    NgZorroAntdModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: NZ_I18N, useValue: fr_FR },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
