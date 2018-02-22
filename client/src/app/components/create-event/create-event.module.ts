import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { MaterialModule } from '../material.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';


/* Feature Components */
import { FormService }    from '../FormService/form.service';
import { EventDetailsComponent } from './event-details/event-details.component';

const Create_Event_Router: Routes = [
  {
    path: '',
    component: CreateEventComponent,
    children: [
      { path: 'eventdetails',  component:  EventDetailsComponent},
      { path: '', component:  CustomerInfoComponent}
    ]
  },
]

export const createEventRouter = RouterModule.forChild(Create_Event_Router);

@NgModule({
  imports: [
    CommonModule,
    createEventRouter,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyDateRangePickerModule
  ],
  providers: [{ provide: FormService, useClass: FormService }],
  declarations: [CreateEventComponent, CustomerInfoComponent, EventDetailsComponent],
})
export class CreateEventModule { }
