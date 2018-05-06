import { Component, OnInit, ViewChild, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { FormService } from './../FormService/form.service';

import { MatPaginator, MatSort, MatTableDataSource, MatChipList, MatChipListChange, MatChipSelectionChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todayEvents;
  recentEvents;
  totalItems;
  totalCustomers;
  totalEvents;
  monthlyOrdersChart = 'monthlyOrdersChart';
  itemsCategoryChart = 'itemsCategoryChart';
  monthlySalesChart = 'monthlySalesChart';
  monthlyOrdersChartWidth = 800;
  monthlyOrdersChartHeight = 400;
  monthlyOrdersChartType = 'column2d';
  monthlyOrdersChartDataFormat = 'json';
  monthlyOrdersChartJsonData: any;
  monthlyOrdersChartDataSource: any = {};
  dueAmountGaugeType = "arch";
  dueAmountGaugeValue=0;
  dueAmountGaugeLabel = "Total Amount Due";
  dueAmountGaugeAppendText = "PKR";

  totalRevenueGaugeType = "arch";
  totalRevenueGaugeValue;
  totalRevenueGaugeLabel = "Total Revenue";
  totalRevenueGaugeAppendText = "PKR";

  soDueGaugeType = "arch";
  soDueGaugeValue;
  soDueGaugeLabel = "No of orders amount due";
  soDueGaugeAppendText = "Orders";

  monthlySalesChartWidth = 800;
  monthlySalesChartHeight = 400;
  monthlySalesChartType = 'mscombi2d';
  monthlySalesChartDataFormat = 'json';
  monthlySalesChartJsonData: any;
  monthlySalesChartDataSource: any = {};

  constructor(public dialog: MatDialog, private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }

  ngOnInit() {
    
    var items = this.commonService.getItems().subscribe(res => {
      
    });
    var itemsSold = this.commonService.getBookingItems().subscribe(res => {
      
    });
    this.getEvents();
    this.getTodayEvents();
    this.getRecentEvents();
    this.getMonthlySales();
    this.getMonthlySalesTargets();
    this.getTotalStats();
   

  }
  
  getEvents() {
    var events  = this.commonService.getEvents().subscribe(res => {
      var object = this.formDataService.getEventChartsData(res);
      this.totalRevenueGaugeValue = object.totalRevenue;
      this.dueAmountGaugeValue = object.amountDue;
      this.soDueGaugeValue = object.countOfOrderDue;
      
    });
  }

  getTotalStats() {
    this.commonService.getTotalEvents().subscribe(res => {
      this.totalEvents = !!res[0]? res[0].count : 0;
    });
    this.commonService.getTotalCustomers().subscribe(res => {
      this.totalCustomers = !!res[0]? res[0].count : 0;
    });
    this.commonService.getTotalItems().subscribe(res => {
      this.totalItems = !!res[0]? res[0].count : 0;
    });
  }

  getTodayEvents() {
   this.commonService.getTodayEvents().subscribe(res => {
      console.log("todayEvents " + JSON.stringify(res))
      this.todayEvents = res;
    });
  }

  getRecentEvents() {
    this.commonService.getRecentEvents().subscribe(res => {
       console.log("Recent " + JSON.stringify(res))
       this.recentEvents = res;
     });
   }

  goToNext(eventCode) {
    console.log("eventCOde "+ eventCode);
    this.router.navigateByUrl('/searchEvents/updateEvent/'+eventCode);
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

  openDialog(eventCode, amountRemaining) {
    if(parseInt(amountRemaining) > 0) {
      let dialogRef = this.dialog.open(dialogReceivePayment, {
        width: '250px',
        data: { name: eventCode, payment: amountRemaining }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed' + result);
        this.commonService.recieveAmount({eventCode: eventCode, amount: result});
        this.getTodayEvents();
      });
    }
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../dialog-recieve-payment/dialog-recieve-payment.html',
})

export class dialogReceivePayment {

  constructor(
    public dialogRef: MatDialogRef<dialogReceivePayment>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
