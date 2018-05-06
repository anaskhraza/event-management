import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { CommonService } from '../../common.service'
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HomeComponent} from "./home.component";

import { FormService } from '../FormService/form.service';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { dialogReceivePayment} from './home.component';
import { GaugeModule } from 'angular-gauge';


const Home_Router: Routes =[
  {
      path: '',
      component: HomeComponent
  }
];

export const homeRouter = RouterModule.forChild(Home_Router);
@NgModule({
  imports: [
    CommonModule,
    homeRouter,
    FormsModule,
    ReactiveFormsModule,
    GaugeModule.forRoot(),
    MaterialModule,
    MyDateRangePickerModule,
    HttpClientModule,
    FusionChartsModule.forRoot(FusionCharts, Charts, OceanTheme)
  ],
  entryComponents: [HomeComponent, dialogReceivePayment],
  providers: [CommonService, { provide: FormService, useClass: FormService }],
  declarations: [HomeComponent, dialogReceivePayment]
})
export class HomeModule { }
