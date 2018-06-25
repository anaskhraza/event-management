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
  selector: 'app-add-monthly-target',
  templateUrl: './add-monthly-target.component.html',
  styleUrls: ['./add-monthly-target.component.css']
})
export class AddMonthlyTargetComponent implements OnInit {
  saveSuccess: boolean;
  saveError: boolean;
  colors = '';
  monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  monthlyTarget: any = {
    month: '',
    year: '',
    target: '',
  };
  constructor(private router: Router, private alertService: AlertService, private formDataService: FormService, private commonService:CommonService) { }

  ngOnInit() {
  }

  saveItem(){
    if(this.monthlyTarget.target && this.monthlyTarget.year && this.monthlyTarget.month){
      this.commonService.createTarget(this.monthlyTarget);
      this.router.navigateByUrl('/searchMonthlyTarget');
    } else{
      this.error("Failure");
    }
  }

  error(message: string) {
    console.log(message);
    this.alertService.error(message);

}
}
