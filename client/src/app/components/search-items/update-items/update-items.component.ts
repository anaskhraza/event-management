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
  constructor(private formDataService: FormService, private _formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.hero = this.route.params.subscribe(params => {
      console.log(params['id']); 
      this.getItemDetails(params['id']);

   });
    
  }
  
 getItemDetails(sku){
   this.itemDetails = this.formDataService.getItemDetails();
  }

}
