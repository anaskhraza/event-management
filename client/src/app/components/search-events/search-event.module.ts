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
import { SearchEventsComponent, dialogReceivePayment} from './search-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';
const Search_Event_Router: Routes =[
  {
      path: '',
      component: SearchEventsComponent
  },
  { path: 'updateEvent/:id', component: UpdateEventComponent }
];

export const searchEventRouter = RouterModule.forChild(Search_Event_Router);
@NgModule({
  imports: [
    CommonModule,
    searchEventRouter,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  entryComponents: [SearchEventsComponent, dialogReceivePayment],
  providers: [CommonService, { provide: FormService, useClass: FormService }],
  declarations: [SearchEventsComponent, UpdateEventComponent, dialogReceivePayment]
})
export class SearchEventModule { }
