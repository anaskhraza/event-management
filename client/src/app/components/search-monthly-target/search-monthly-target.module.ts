import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SearchMonthlyTargetComponent, dialogDeleteItem } from './search-monthly-target.component';
import { CommonService } from '../../common.service'
import { HttpClientModule } from '@angular/common/http';


/* Feature Components */
import { FormService }    from '../FormService/form.service';

import { AlertComponent } from '../_directives/index';
import { AlertService } from '../_services/index';
import { AddMonthlyTargetComponent } from './add-monthly-target/add-monthly-target.component';

const Search_Items_Router: Routes = [
  {
    path: '',
    component: SearchMonthlyTargetComponent
  },
  { path: 'addMonthlyTarget', component: AddMonthlyTargetComponent },
]

export const searchTargetRouter = RouterModule.forChild(Search_Items_Router);

@NgModule({
  imports: [
    CommonModule,
    searchTargetRouter,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  entryComponents: [ SearchMonthlyTargetComponent ,dialogDeleteItem],
  providers: [AlertService, CommonService, { provide: FormService, useClass: FormService }],
  declarations: [SearchMonthlyTargetComponent, AddMonthlyTargetComponent, dialogDeleteItem]
})
export class SearchMonthlyTargetModule { }
