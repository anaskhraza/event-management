import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { itemSelector, item } from '../../FormService/form.model'
import { FormService } from '../../FormService/form.service';
import { MatPaginator, MatSort, MatTableDataSource, MatChipList, MatChipListChange, MatChipSelectionChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMyDrpOptions, IMyDateRangeModel, IMyDateRange, IMyInputFieldChanged, IMyCalendarViewChanged, IMyDateSelected } from 'mydaterangepicker';
import { CommonService } from '../../../common.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { SelectionModel } from '@angular/cdk/collections';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  selected: string;
  categories: any;
  title = 'Please tell us about yourself.';
  cost: number = 0;
  itemSelector: itemSelector;
  displayedColumns = ['id', 'select', 'name', 'quantity', 'unitprice', 'price', 'category', 'noOfDays', 'color', 'date',];
  dataSource: MatTableDataSource<ItemData>;
  selectedcategory: string = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  name = '';
  email = '';
  number = '';
  eventTitleValid = false;
  eventTimeBeginValid = false;
  eventTimeEndValid = false;
  eventLocationValid = false;
  location = '';
  eventTitle = '';
  eventAddress = '';
  eventCode = '';
  perHead = 0;
  noOfGuests = 0;
  discount = '';
  netAmount = 0;
  grossAmount = 0;
  numberOfDays;
  advance = "0";
  balance = "0";
  totalCost: number = 0;
  eventPerHead = true;
  eventGuests = true;
  amountPaid = 0;
  amountRemaining = 0;
  eventRequisites;
  personal: any;
  finance: any;
  eventDetails: any;
  form: any;
  responseStatus: any = { status: 203 };;


  itemSource: any = [];
  date: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
  };
  constructor(public dialog: MatDialog, private formDataService: FormService, private commonService: CommonService,
    private router: Router, private activatedRoute: ActivatedRoute) {
  }
  selection = new SelectionModel(true, []);

  toggle: boolean = false;

  numberFormControl = new FormControl('', [
    Validators.pattern("^[0-9]+$"),
    Validators.required
  ])

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  textFormControl = new FormControl('', [
    Validators.required,
  ]);


  ngOnInit() {

    // this.personal = this.formDataService.getPersonal();
    // this.finance = this.formDataService.getFinanceDetails();
    // this.eventDetails = this.formDataService.getEventDetails();
    // subscribe to router event
    var url = this.router.url;
    var urlArary = url.split("/");
    var eventCode = urlArary[3];

    this.commonService.getEventDetailsForUpdate(eventCode).subscribe(res => {
      console.log("update    ------>   " + JSON.stringify(res));
      let response: any = res;
      this.personal = {};
      this.eventCode = response.events_code;
      this.name = response.name;
      this.number = response.number;
      this.email = response.email;
      this.eventRequisites = response.dates;
      this.eventDetails = response.eventDetails;
      this.title = response.event_name;
      this.location = response.location;
      this.totalCost = response.gross_amount;
      this.grossAmount = response.gross_amount;
      this.discount = response.discount_amount;
      this.advance = response.recieved_amount;
      this.noOfGuests = (!!response.noOfGuests && response.noOfGuests != "0") ? response.noOfGuests : '';
      this.perHead = (!!response.perHeadCost && response.perHeadCost != "0") ? response.perHeadCost : '';
      console.log(this.noOfGuests);
      console.log(this.perHead);
      if (this.noOfGuests && this.perHead) {
        this.toggle = true;
      }
      //this.personal.gross_amount = res.gross_amount,
    });

    //  var itemsArray = this.formDataService.getItemsArray();
    this.commonService.getItemsForUpdate(eventCode).subscribe(res => {

      this.itemSource = res
      this.itemSource = this.formDataService.parseItemsUpdateResponse(this.itemSource, this.eventRequisites);
      this.dataSource = new MatTableDataSource(this.itemSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


    this.commonService.getItemCategories().subscribe(res => {
      this.categories = res;
    });



  }

  daysBetween(date1, date2) {   //Get 1 day in milliseconds   
    if (!date1 || !date2) {
      return 0;
    }
    var one_day = 60 * 60 * 24;    // Convert both dates to milliseconds    // Calculate the difference in milliseconds  
    var difference_ms = date2 - date1;        // Convert back to days and return   
    return Math.round(difference_ms / one_day);
  }

  getTotal(qtyOrdered, price, noOfDays, itemSource) {

    if (!qtyOrdered) {
      qtyOrdered = 0;
    }
    if (!noOfDays || noOfDays == 0) {
      noOfDays = 1;
    }
    this.numberOfDays = noOfDays;
    itemSource.cost = parseInt(qtyOrdered) * parseInt(price) * parseInt(noOfDays);
  }

  filterChange(filter) {
    this.applyFilter(filter);
  }

  itemChecked(event, itemSource) {
    if (!event) {
      itemSource.quantity_booked = 0;
    } else if (!itemSource.quantity_booked || itemSource.quantity_booked == 0) {
      itemSource.quantity_booked = 1;
    }

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getTotalCost(perHead, noOfGuests) {

    if (!this.toggle) {
      this.totalCost = this.grossAmount;
    } else {
      if (!perHead) {
        this.perHead = 0;
      }

      if (!noOfGuests) {
        this.noOfGuests = 0;
      }
      this.totalCost = parseFloat(noOfGuests) * parseFloat(perHead);
    }
  }

  openDialog(eventCode, amountRemaining) {
    let dialogRef = this.dialog.open(dialogConfirmMessage, {
      width: '300px',
      height: '300px',
      data: { name: eventCode, payment: amountRemaining }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/searchEvents');
      console.log('The dialog was closed' + result);
    });

  }

  getNetAmount(totalCost, discount) {
    if (totalCost) {
      this.discount = discount ? discount : 0;
      this.grossAmount = this.totalCost;
      this.netAmount = this.totalCost - parseFloat(this.discount);
    } else {
      this.netAmount = 0;
    }
  }

  getBalance(netAmount, advance) {
    var advanceAmount = 0;
    if (advance) {
      advanceAmount = parseFloat(advance) || 0;
    }
    this.amountPaid = advanceAmount;
    this.amountRemaining = parseFloat(netAmount) - advanceAmount;

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.dataSource.filter = filterValue;

  }

  updatePrice() {
    console.log(JSON.stringify(this.itemSource));
    this.totalCost = this.formDataService.getTotalCostOnUpdate(this.itemSource);
    this.grossAmount = this.totalCost;
  }

  onChange(event: any) {
    this.eventPerHead = false;
    this.eventGuests = false;
    this.getTotalCost(this.perHead, this.noOfGuests);
  }

  onDateRangeChanged(event: IMyDateRangeModel, itemSource) {
    console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' - beginJsDate: ', new Date(event.beginJsDate).toLocaleDateString(), ' - End: ', event.endDate, ' - endJsDate: ', new Date(event.endJsDate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - beginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
    itemSource.no_of_days = this.daysBetween(event.beginEpoc, event.endEpoc);
    this.numberOfDays = itemSource.no_of_days;
    console.log(itemSource.no_of_days);
  }

  saveEvent() {
    if (!this.noOfGuests && !this.perHead) {
      this.noOfGuests = 0;
      this.perHead = 0;
    }
    console.log("number of day", this.numberOfDays);
    if (this.numberOfDays) {
      if (parseInt(this.numberOfDays) <= 1) {
        this.numberOfDays = "";
      }
    } else if (!this.numberOfDays) {
      this.numberOfDays = "";
    }
    console.log("number of day 1", this.numberOfDays);
    this.formDataService.updateEvent(this.commonService, this.itemSource, this.totalCost,
      this.discount, this.netAmount, this.amountPaid, this.amountRemaining,
      this.perHead, this.noOfGuests, this.eventDetails, this.eventCode, this.numberOfDays)
      .then((response) => {
        console.log(response);
        this.responseStatus = response;
        console.log(this.responseStatus);
        if (this.responseStatus.status == "202") {
          this.openDialog(response, "");
        }

      });

    //this.router.navigateByUrl('/searchEvents');
  }
}

@Component({
  selector: 'dialog-confirm-example-dialog',
  templateUrl: '../../dialog-confirm/dialog-confirm.html',
})

export class dialogConfirmMessage {

  constructor(
    private router: Router, public dialogRef: MatDialogRef<dialogConfirmMessage>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formDataService: FormService, private commonService: CommonService) { }

  onPrint(obj): void {
    var eventCode = obj.response;
    this.formDataService.printInvoice(eventCode, this.commonService).subscribe(res => {
      var template = res.data;
      this.formDataService.printData(template, this.commonService, eventCode);
      this.router.navigateByUrl('/searchEvents');
    });;
  }
}


export interface ItemData {
  id: string;
  name: string;
  quantity: string;
  color: string;
}
