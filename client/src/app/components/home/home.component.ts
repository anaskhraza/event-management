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

  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  jsonData: any;
  dataSource;
  title = 'Angular4 FusionCharts Sample';
  constructor(private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }

  ngOnInit() {
    var events  = this.commonService.getEvents();
    var items = this.commonService.getItems();
    var itemsSold = this.commonService.getBookingItems();
    var monthlySales = this.commonService.getMontlySales();

    console.log("events " + JSON.stringify(events) )
  }

}
