import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { SearchEventsComponent} from './search-events.component';
const Search_Event_Router: Routes =[
  {
      path: '',
      component: SearchEventsComponent
  }
];

export const searchEventRouter = RouterModule.forChild(Search_Event_Router);
@NgModule({
  imports: [
    CommonModule,
    searchEventRouter
  ],
  declarations: [SearchEventsComponent]
})
export class SearchEventModule { }
