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
import { AlertService } from '../../_services/index';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private alertService: AlertService, private formDataService: FormService, private commonService:CommonService) { }
  category: any;
  textFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
  }

  saveItem(){
    if(this.category){
      this.commonService.createCategory({category: this.category});
    } else{
    }
  }

}
