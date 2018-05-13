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
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  saveSuccess: boolean;
  saveError: boolean;
  colors = '';
  itemDetails: any = {
    name: '',
    selectedCategory: '',
    sku: '',
    quantity: '',
    rate: '',
    colors: ''
  };
  categories: any;
  constructor(private router: Router, private alertService: AlertService, private formDataService: FormService, private commonService:CommonService) { }
  ngOnInit() {

    this.commonService.getItemCategories().subscribe(res => {
      this.categories = res;
    });
  }

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

  saveItem(){
    if(this.itemDetails.name && this.itemDetails.sku && this.itemDetails.quantity && this.itemDetails.rate){
      this.itemDetails.colors = this.colors;
      this.commonService.createItem(this.itemDetails);
      this.router.navigateByUrl('/searchItems');
    } else{
      this.error("Filture");
    }
  }

  error(message: string) {
    console.log(message);
    this.alertService.error(message);
}

  
  

}
