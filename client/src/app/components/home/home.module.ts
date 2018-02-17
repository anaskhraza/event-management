import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {Routes, RouterModule} from "@angular/router";
import { ModuleWithProviders } from '@angular/core';

const Home_Router: Routes =[
  {
      path: '',
      component: HomeComponent
  }
];

export const homeRouter = RouterModule.forChild(Home_Router);
@NgModule({
  imports: [
    CommonModule,
    homeRouter
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
