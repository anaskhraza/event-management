import { Component, OnInit, ViewChild, Inject,  ChangeDetectorRef } from '@angular/core';
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

  displayedColumns = ['eventcode', 'name', 'number','eventdatestart', 'eventdateend', 'totalamount', 'amountremaining', 'updatebtn', 'chargebilling', 'deleteevent'];
  dataSource: MatTableDataSource<ItemData>;
  list = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private formDataService: FormService, private commonService: CommonService, private router: Router,  private changeDetectorRefs: ChangeDetectorRef) {
  }
  eventSource: any = [];
  categories:any;
  isLoadingResults = false;

  ngOnInit(){
    this.refresh();
  }

  refresh() {
    this.commonService.getEvents().subscribe(res => {
      console.log(JSON.stringify("232" + JSON.stringify(res)));
      this.eventSource = res;
      this.dataSource = new MatTableDataSource(this.eventSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    });
    
  }

  goToNext(eventCode) {
    console.log("eventCOde "+ eventCode);
    this.router.navigateByUrl('/searchEvents/updateEvent/' + eventCode);
  }

  newEvent() {
    this.router.navigateByUrl('/createEvent');
  }

  getAllItems(){
    var res= '';
		this.commonService.getItems().subscribe(res =>{
		 console.log(res);
		})
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
        this.refresh();
      });
    }
  }

  openDialogDeleteEvent(eventCode) {
      let dialogRef = this.dialog.open(dialogDeleteEvent, {
        width: '250px',
        data: { name: eventCode, action: "delete"}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == "delete") {
        console.log('The dialog was closed' + result);
        this.commonService.deleteEvent(eventCode);
        this.refresh();
        }
      });
  }

  refreshTable() {
    this.isLoadingResults = true;
   setTimeout(() => {
    this.isLoadingResults = false;
    this.refresh();
    }, 1000);
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

@Component({
  selector: 'dialog-overview-example-dialog-1',
  templateUrl: '../dialog-delete-event/dialog-delete-event.html',
})

export class dialogDeleteEvent {

  constructor(
    public dialogRef: MatDialogRef<dialogDeleteEvent>,
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
