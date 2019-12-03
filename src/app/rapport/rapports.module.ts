import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {RapportComponent} from './rapport.component';
import {PrimeModule} from "../prime.module";
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  {path: 'rapport', component: RapportComponent}
];

@NgModule({
  declarations: [
    RapportComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class RapportsModule { }
