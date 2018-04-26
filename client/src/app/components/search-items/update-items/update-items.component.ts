import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {
  itemDetails: any;
  name: string = '';
  sku: string = '';
  rate: number  = 0;
  quantity: number = 0;
  categories: any;
  selectedCategory = '';
  color = '';
 constructor(private formDataService: FormService, private commonService: CommonService, private _formBuilder: FormBuilder, private route: ActivatedRoute) {}
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
    this.itemDetails = this.formDataService.getTempItemObjectInstace();
    this.name = this.itemDetails.name;
    this.sku = this.itemDetails.items_code;
    this.rate = this.itemDetails.price;
    this.quantity = this.itemDetails.quantity;
    this.selectedCategory = this.itemDetails.category;
    this.color = JSON.stringify(this.itemDetails.color);

    console.log("itemDetails" + JSON.stringify(this.itemDetails));


  this.commonService.getItemCategories().subscribe(res => {
    this.categories = res;
  });
    
  }

  saveItem() {
    var postData = {
      name: this.name,
      sku: this.sku,
      price: this.rate,
      quantity: this.quantity,
      category: this.selectedCategory,
      colors: this.color
    }
    
  }


}
