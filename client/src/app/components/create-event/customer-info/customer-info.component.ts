import { Component, OnInit } from '@angular/core';
import { customerInfo, finance, eventDetails } from '../../FormService/form.model'
import { FormService } from '../../FormService/form.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { itemSelector, item } from '../../FormService/form.model'
import { MatPaginator, MatSort, MatTableDataSource, MatChipList, MatChipListChange, MatChipSelectionChange } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { IMyDrpOptions } from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
})
export class CustomerInfoComponent implements OnInit {
  title = 'Please tell us about yourself.';
  name = '';
  email = '';
  number = '';
  eventTitleValid = false;
  eventTimeBeginValid = false;
  eventTimeEndValid = false;
  eventLocationValid = false;
  eventTitle = '';
  eventAddress = '';
  perHead = '';
  noOfGuests = '';
  discount = '';
  netAmount = 0;
  totalCost: number = 0;
  eventPerHead = true;
  eventGuests = true;
  personal: any;
  finance: any;
  eventDetails: any;
  form: any;
  constructor(private formDataService: FormService, private commonService:CommonService) { }
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
    this.personal = this.formDataService.getPersonal();
    this.finance = this.formDataService.getFinanceDetails();
    this.eventDetails = this.formDataService.getEventDetails();

    console.log('Personal feature loaded!');
  }

  getTotalCost(perHead, noOfGuests) {
    if (!this.toggle) {
      this.finance.totalCost = this.formDataService.getTotalCost();
    } else {
      if (!perHead) {
        this.eventDetails.perHead = 0;
      }

      if (!noOfGuests) {
        this.eventDetails.noOfGuests = 0;
      }
      this.finance.totalCost = parseFloat(noOfGuests) * parseFloat(perHead);
    }
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    this.formDataService.setPersonal(this.personal);
    return true;
  }


  onChange(event: any) {
    this.eventPerHead = false;
    this.eventGuests = false;
  }

  getNetAmount(totalCost, discount) {
    if(totalCost){
      this.finance.discount = discount? discount: 0;
      this.finance.grossAmount = this.finance.totalCost;
      this.finance.netAmount = parseFloat(this.finance.totalCost) - parseFloat(this.finance.discount);
    }else{
      this.finance.netAmount = 0;
    }
  }

  saveEvent(){
    this.formDataService.setEventDetails(this.eventDetails);
    this.formDataService.setFinanceDetails(this.finance);
    this.formDataService.setPersonal(this.personal);
    this.formDataService.saveEvent(this.commonService);
  }

}
