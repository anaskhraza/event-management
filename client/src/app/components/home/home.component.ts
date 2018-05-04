import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { FormService } from './../FormService/form.service';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todayEvents;
  monthlyOrdersChart = 'monthlyOrdersChart';
  itemsCategoryChart = 'itemsCategoryChart';
  monthlySalesChart = 'monthlySalesChart';
  monthlyOrdersChartWidth = 800;
  monthlyOrdersChartHeight = 400;
  monthlyOrdersChartType = 'column2d';
  monthlyOrdersChartDataFormat = 'json';
  monthlyOrdersChartJsonData: any;
  monthlyOrdersChartDataSource: any = {};

  monthlySalesChartWidth = 800;
  monthlySalesChartHeight = 400;
  monthlySalesChartType = 'mscombi2d';
  monthlySalesChartDataFormat = 'json';
  monthlySalesChartJsonData: any;
  monthlySalesChartDataSource: any = {};

  constructor(private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }

  ngOnInit() {
    var events  = this.commonService.getEvents().subscribe(res => {
      this.formDataService.getEventChartsData(res);
    });
    var items = this.commonService.getItems().subscribe(res => {
      
    });
    var itemsSold = this.commonService.getBookingItems().subscribe(res => {
      
    });
    this.getTodayEvents();
    this.getMonthlySales();
    this.getMonthlySalesTargets();
   

  }

  getTodayEvents() {
   this.commonService.getTodayEvents().subscribe(res => {
      console.log("todayEvents " + JSON.stringify(res))
      this.todayEvents = res;
    });
  }

  getMonthlySalesTargets() {
    var monthlyTargets = this.commonService.getMontlyTargetSales().subscribe(res => {
      this.monthlySalesChartDataSource = this.formDataService.getMontlyTargetSales(res);
      this.monthlySalesChartDataSource.chart = {
        "caption": "Actual Revenues, Targeted Revenues",
        "subcaption": "This Year",
        "xaxisname": "Month",
        "yaxisname": "Amount (In PKR)",
        "numberprefix": "Rs ",
        "theme": "ocean"
      }
    });
  }


  getMonthlySales() {
    
    var monthlySales = this.commonService.getMontlySales().subscribe(res => {
      this.monthlyOrdersChartDataSource.data = this.formDataService.getMonthlySalesData(res);
      this.monthlyOrdersChartDataSource.chart = {
        "caption": "Monthly Report",
        "subCaption": "Monthly Sales Report",
        "numberPrefix": "",
        "theme": "ocean"
    }
    });
  }

}
