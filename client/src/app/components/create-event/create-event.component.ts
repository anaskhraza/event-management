import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eventDetails } from './../FormService/form.model'
import { FormService } from './../FormService/form.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IMyDrpOptions } from 'mydaterangepicker';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  date: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  form: any;
  eventDetails: eventDetails;
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  eventDate = "";
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private formDataService: FormService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
