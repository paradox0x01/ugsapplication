import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { NgSelectModule } from '@ng-select/ng-select';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgDatepickerModule } from 'ng2-datepicker';
import {PasswordModule} from 'primeng/password';
import {TabViewModule} from 'primeng/tabview';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { NzFormModule } from 'ng-zorro-antd/form';
import {CardModule} from 'primeng/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    InputTextareaModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToggleButtonModule,
    NgSelectModule,
    ProgressSpinnerModule,
    SlimLoadingBarModule,
    NgDatepickerModule,
    PasswordModule,
    NgbPaginationModule,
    TabViewModule,
    FullCalendarModule,
    NzFormModule,
    CardModule,
    NzDescriptionsModule,
    NgbPaginationModule
   ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    InputTextareaModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToggleButtonModule,
    NgSelectModule,
    ProgressSpinnerModule,
    SlimLoadingBarModule,
    NgDatepickerModule,
    PasswordModule,
    NgbPaginationModule,
    TabViewModule,
    FullCalendarModule,
    NzFormModule,
    CardModule,
    NzDescriptionsModule
  ]
})
export class PrimeModule { }
