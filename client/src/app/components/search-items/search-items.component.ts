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
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit{
  

  displayedColumns = ['id', 'sku', 'name',  'unitprice', 'category', 'quantity', 'color', 'update'];
  dataSource: MatTableDataSource<ItemData>;
  list = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }
  itemSource: any = [];
  categories:any;

  ngOnInit(){
    var itemsArray = this.formDataService.getItemsArray();
    this.commonService.getItems().subscribe(res => {
      this.itemSource = this.formDataService.parseItemsResponse(res, null, null);
      this.dataSource = new MatTableDataSource(this.itemSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.commonService.getItemCategories().subscribe(res => {
      this.categories = res;
    });

  }

  goToNext() {
    this.formDataService.setItemArray(this.itemSource);
    this.router.navigateByUrl('/searchItems/addItem');
  }

  getAllItems(){
    var res= '';
		// this.commonService.getItems().subscribe(res =>{
		//  console.log(res);
		// })
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

  filterChange(filter) {
    this.applyFilter(filter);
  }

}
export interface ItemData {
  id: string;
  name: string;
  quantity: string;
  color: string;
}

