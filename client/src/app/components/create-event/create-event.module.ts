import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { CommonService } from '../../common.service'
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEventComponent } from './create-event.component';
import { CustomerInfoComponent, dialogConfirmMessage } from './customer-info/customer-info.component';
/* Feature Components */
import { FormService } from '../FormService/form.service';
import { EventDetailsComponent } from './event-details/event-details.component';


const Create_Event_Router: Routes = [
  { path: '', component: CreateEventComponent },
  { path: 'eventdetails', component: EventDetailsComponent },
  { path: 'custeveinfo', component: CustomerInfoComponent }
]

export const createEventRouter = RouterModule.forChild(Create_Event_Router);

@NgModule({
  imports: [
    CommonModule,
    createEventRouter,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  entryComponents: [CustomerInfoComponent, dialogConfirmMessage],
  providers: [CommonService, { provide: FormService, useClass: FormService }],
  declarations: [CreateEventComponent, CustomerInfoComponent, EventDetailsComponent, dialogConfirmMessage]
})
export class CreateEventModule { }
