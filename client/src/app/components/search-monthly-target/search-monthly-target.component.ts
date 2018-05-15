import { Component, OnInit, ViewChild, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { FormService } from './../FormService/form.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-monthly-target',
  templateUrl: './search-monthly-target.component.html',
  styleUrls: ['./search-monthly-target.component.css']
})
export class SearchMonthlyTargetComponent implements OnInit {

  isLoadingResults = false;
  displayedColumns = ['month', 'target', 'year', 'deletetarget'];
  dataSource: MatTableDataSource<ItemData>;
  list = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }
  itemSource: any = [];

  ngOnInit(){
    this.refresh();
  }

  refreshTable() {
    this.isLoadingResults = true;
   setTimeout(() => {
    this.isLoadingResults = false;
    this.refresh();
    }, 1000);
  }

  refresh() {
    this.commonService.getTargets().subscribe(res => {
      this.itemSource = this.formDataService.parseItemsResponse(res, null, null);
      this.dataSource = new MatTableDataSource(this.itemSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  openDialogDeleteItem(year, month) {
    let dialogRef = this.dialog.open(dialogDeleteItem, {
      width: '250px',
      data: { name: year + "  " + month, action: "delete"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "delete") {
      console.log('The dialog was closed' + result);
      this.commonService.deleteTarget({year: year, month: month});
      }
    });
}
  goToNext() {
    this.router.navigateByUrl('/searchMonthlyTarget/addMonthlyTarget');
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog-2',
  templateUrl: '../dialog-delete-event/dialog-delete-event.html',
})

export class dialogDeleteItem {

  constructor(
    public dialogRef: MatDialogRef<dialogDeleteItem>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface ItemData {
  id: string;
  name: string;
  quantity: string;
  color: string;
}