import { Component, OnInit, ViewChild } from '@angular/core';
import { eventDetails } from '../../FormService/form.model'
import { FormService } from '../../FormService/form.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { IMyDrpOptions } from 'mydaterangepicker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
 
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  title = 'Please tell us about yourself.';
  games = [
    {
      "id": "1",
      "name": "DOTA 2",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Strategy",
      "date": ""
    },
    {
      "id": "2",
      "name": "AOE 3",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Strategy",
      "date": ""
    },
    {
      "id": "3",
      "name": "GTA 5",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "RPG",
      "date": ""
    },
    {
      "id": "4",
      "name": "Far Cry 3",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Action",
      "date": ""
    },
    {
      "id": "5",
      "name": "GTA San Andreas",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "RPG",
      "date": ""
    },
    {
      "id": "6",
      "name": "Hitman",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Action",
      "date": ""
    },
    {
      "id": "7",
      "name": "NFS MW",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Sport",
      "date": ""
    }, {
      "id": "8",
      "name": "Fifa 16",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Sport",
      "date": ""
    }, {
      "id": "9",
      "name": "NFS Sen 2",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Sport",
      "date": ""
    }, {
      "id": "10",
      "name": "Witcher Assassins on King",
      "countries": [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" },
      ],
      "genre": "Adventure",
      "date": ""
    }
  ];
  eventDetails: eventDetails;
  date: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  form: any;
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  constructor(private formDataService: FormService) {
  }
  displayedColumns = ['select', 'id', 'name', 'date'];

  dataSource = new MatTableDataSource(this.games);

  selection = new SelectionModel(true, []);
  ngOnInit() {
    this.eventDetails = this.formDataService.getEventDetails();
    console.log('Personal feature loaded!');
  }
  /////////////////////////////////////
  /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  
      // this.dataSource.filter = filterValue;
    
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

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    this.formDataService.setEventDetails(this.eventDetails);
    return true;
  }

  goToNext() {
    console.log(JSON.stringify(this.games))
  }

}


  //////////////////////////////////
