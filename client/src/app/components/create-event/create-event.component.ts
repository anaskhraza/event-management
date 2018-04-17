import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eventRequisites } from './../FormService/form.model'
import { FormService } from './../FormService/form.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IMyDrpOptions } from 'mydaterangepicker';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  date: Date = new Date();
  form: any;
  dateRange: any;

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    inline: false,
    editableDateRangeField: false,
    openSelectorOnInputClick: true
  };
  eventRequisites: eventRequisites;

  constructor(private formDataService: FormService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.eventRequisites = this.formDataService.getEventRequisites();
  }

  next() {
    this.formDataService.setEventRequisites(this.eventRequisites);
    this.router.navigateByUrl('/createEvent/eventdetails');
  }

}

