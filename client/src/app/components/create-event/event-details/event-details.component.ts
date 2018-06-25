import { Component, OnInit, ViewChild } from '@angular/core';
import { itemSelector, item } from '../../FormService/form.model'
import { FormService } from '../../FormService/form.service';
import { MatPaginator, MatSort, MatTableDataSource, MatChipList, MatChipListChange, MatChipSelectionChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { IMyDrpOptions } from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  selected: string;
  categories: any;
  title = 'Please tell us about yourself.';
  cost: number = 0;
  itemSelector: itemSelector;
  displayedColumns = ['id', 'select', 'name', 'quantity', 'unitprice', 'price', 'category', 'color', 'date'];
  dataSource: MatTableDataSource<ItemData>;
  selectedcategory: string = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  selectedItemText = "";


  itemSource: any = [];
  date: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  form: any;
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
  };
  constructor(private formDataService: FormService, private commonService: CommonService, private router: Router) {
  }




  selection = new SelectionModel(true, []);

  ngOnInit() {
    var itemsArray = this.formDataService.getItemsArray();
    this.formDataService.getCalculatedItems(this.commonService).subscribe(res => {
      this.itemSource = this.formDataService.parseItemsResponse(res, this.commonService, true);
      this.dataSource = new MatTableDataSource(this.itemSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.commonService.getItemCategories().subscribe(res => {
      this.categories = res;
    });

  }
  /////////////////////////////////////
  /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.dataSource.filter = filterValue;

  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  getTotal(qtyOrdered, price, itemSource) {
    if (!qtyOrdered) {
      qtyOrdered = 0;
    }
    itemSource.cost = parseInt(qtyOrdered) * parseInt(price);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    return true;
  }

  goToNext() {
    this.formDataService.setItemArray(this.itemSource);
    this.router.navigateByUrl('/createEvent/custeveinfo');
  }

  filterChange(filter) {
    this.applyFilter(filter);
  }

  itemChecked(event, itemSource) {
    if (!event) {
      itemSource.quantityOrdered = 0;
    } else if (!itemSource.quantityOrdered || itemSource.quantityOrdered == 0) {
      itemSource.quantityOrdered = 1;
    }

    if(this.selectedItemText) {
      var itemsArray = this.selectedItemText.split(",");
      console.log(itemsArray);
      console.log(itemSource.name);
      console.log(itemsArray.indexOf(itemSource.name) > -1);
      if(itemsArray.indexOf(itemSource.name) > -1) {
        var index = itemsArray.indexOf(itemSource.name);
        itemsArray.splice(index,1);
        this.selectedItemText = itemsArray.toString();
      } else {
        this.selectedItemText = this.selectedItemText + "," + itemSource.name; 
      }
    } else {
      this.selectedItemText = itemSource.name;
    }

  }
}

export interface ItemData {
  id: string;
  name: string;
  quantity: string;
  color: string;
}
