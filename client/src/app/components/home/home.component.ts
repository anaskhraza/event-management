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
  monthlyOrdersChart = 'monthlyOrdersChart';
  itemsCategoryChart = 'itemsCategoryChart';
  MonnthlySalesChart = 'monthlySalesChart';

  monthlyOrdersChartWidth = 800;
  monthlyOrdersChartHeight = 400;
  monthlyOrdersChartType = 'column2d';
  monthlyOrdersChartDataFormat = 'json';
  monthlyOrdersChartJsonData: any;
  monthlyOrdersChartDataSource: any = {};
  title = 'Angular4 FusionCharts Sample';
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
    var monthlySales = this.commonService.getMontlySales().subscribe(res => {
      this.monthlyOrdersChartDataSource.data = this.formDataService.getMonthlySalesData(res);
      this.monthlyOrdersChartDataSource.chart = {
        "caption": "Monthly Report",
        "subCaption": "Monthly Sales Report",
        "numberPrefix": "",
        "theme": "ocean"
    }
    });

    var monthlyTargets = this.commonService.getMontlyTargetSales().subscribe(res => {
      var temp = this.formDataService.getMontlyTargetSales(res);
    })

  }

}
