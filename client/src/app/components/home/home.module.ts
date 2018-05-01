import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {Routes, RouterModule} from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.carbon';
import { FusionChartsModule } from 'angular4-fusioncharts';

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
    FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
