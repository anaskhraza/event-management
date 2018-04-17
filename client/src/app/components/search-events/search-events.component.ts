import { Component, OnInit, ViewChild } from '@angular/core';
import { itemSelector, item } from './../FormService/form.model'
import { FormService } from './../FormService/form.service';
import { MatPaginator, MatSort, MatTableDataSource, MatChipList, MatChipListChange, MatChipSelectionChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMyDrpOptions } from 'mydaterangepicker';
import { CommonService } from '../../common.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-events',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.css']
})
export class SearchEventsComponent implements OnInit {

  displayedColumns = ['eventcode', 'eventdatestart', 'eventdateend', 'totalamount', 'amountremaining', 'updatebtn'];
  dataSource: MatTableDataSource<ItemData>;
  list = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }
  eventSource: any = [];
  categories:any;

  ngOnInit(){
    this.commonService.getEvents().subscribe(res => {
      console.log(JSON.stringify(res));
      this.eventSource = res;
      this.dataSource = new MatTableDataSource(this.eventSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToNext(eventCode) {
    console.log("eventCOde "+ eventCode);
    this.router.navigateByUrl('/searchEvents/updateEvent/'+eventCode);
  }

  getAllItems(){
    var res= '';
		this.commonService.getItems().subscribe(res =>{
		 console.log(res);
		})
	}
  


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  updateItem(name){
    this.router.navigateByUrl('/searchItems/updateItem;param1=value1'+name);
  }

}
export interface ItemData {
  id: string;
  name: string;
  quantity: string;
  color: string;
}
