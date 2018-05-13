import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { CommonService } from '../../common.service'
import { HttpClientModule } from '@angular/common/http';


/* Feature Components */
import { FormService }    from './../FormService/form.service';
import { SearchEventsDueComponent, dialogReceivePayment} from './search-events-due.component';

const Search_Event_Router: Routes =[
  {
      path: '',
      component: SearchEventsDueComponent
  }
];

export const searchEventRouter1 = RouterModule.forChild(Search_Event_Router);
@NgModule({
  imports: [
    CommonModule,
    searchEventRouter1,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  entryComponents: [SearchEventsDueComponent, dialogReceivePayment],
  providers: [CommonService, { provide: FormService, useClass: FormService }],
  declarations: [SearchEventsDueComponent, dialogReceivePayment]
})
export class SearchEventDueModule { }
