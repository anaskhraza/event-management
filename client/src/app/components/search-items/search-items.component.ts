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
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit{
  selectedcategory = '';
  isLoadingResults = false;
  displayedColumns = ['id', 'sku', 'name',  'unitprice', 'category', 'quantity', 'color', 'update', 'deleteitem'];
  dataSource: MatTableDataSource<ItemData>;
  list = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }
  itemSource: any = [];
  categories:any;
  categoryArray: any;

  ngOnInit(){
    this.refresh();
    this.commonService.getItemCategories().subscribe(res => {
      this.categories = res;
      this.categoryArray = res;
      this.categoryArray = this.categoryArray.slice(1);
    });
  }
  refreshTable() {
    this.isLoadingResults = true;
   setTimeout(() => {
    this.isLoadingResults = false;
    this.refresh();
    }, 1000);
  }
  
  filterChange(filter) {
    this.applyFilter(filter);
  }

  refresh() {
    var itemsArray = this.formDataService.getItemsArray();
    this.commonService.getItems().subscribe(res => {
      this.itemSource = this.formDataService.parseItemsResponse(res, null, null);
      this.dataSource = new MatTableDataSource(this.itemSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToNext() {
    this.formDataService.setItemArray(this.itemSource);
    this.router.navigateByUrl('/searchItems/addItem');
  }

  goToCategory() {
    this.router.navigateByUrl('/searchItems/addCategory');
  }

  getAllItems(){
    var res= '';
		// this.commonService.getItems().subscribe(res =>{
		//  console.log(res);
		// })
  }
  
  openDialogDeleteItem(itemCode) {
    let dialogRef = this.dialog.open(dialogDeleteItem, {
      width: '250px',
      data: { name: itemCode, action: "delete"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "delete") {
      console.log('The dialog was closed' + result);
      this.commonService.deleteItem(itemCode);
      }
    });
}
  


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  updateItem(itemObject){
    this.formDataService.setTempItemObjectInstace(itemObject);
    this.router.navigateByUrl('/searchItems/updateItem/'+itemObject.items_code);
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

