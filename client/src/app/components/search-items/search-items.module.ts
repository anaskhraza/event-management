import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SearchItemsComponent } from './search-items.component';
import { CommonService } from '../../common.service'
import { HttpModule } from '@angular/http';


/* Feature Components */
import { FormService }    from '../FormService/form.service';

const Search_Items_Router: Routes = [
  {
    path: '',
    component: SearchItemsComponent
  }
]

export const searchItemsRouter = RouterModule.forChild(Search_Items_Router);

@NgModule({
  imports: [
    CommonModule,
    searchItemsRouter,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyDateRangePickerModule,
    HttpModule
  ],
  providers: [CommonService, { provide: FormService, useClass: FormService }],
  declarations: [SearchItemsComponent],
})
export class SearchItemsModule { }
