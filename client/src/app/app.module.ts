import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './components/home/home.module';
import { ModuleWithProviders } from '@angular/core'
import { AppComponent } from './app.component';
// import { HomeComponent } from './components/home/home.component';
// import { CreateEventComponent } from './components/create-event/create-event.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
// import { SearchEventsComponent } from './components/search-events/search-events.component';
import { HttpClientModule } from '@angular/common/http';


export const router: Routes = [
    {
        path: '',
        loadChildren: 'app/components/home/home.module#HomeModule',
        pathMatch: 'full'
    },
    {
      path: 'createEvent',
      loadChildren: 'app/components/create-event/create-event.module#CreateEventModule',
    },
    {
      path: 'searchEvents',
      loadChildren: 'app/components/search-events/search-event.module#SearchEventModule',
    },
    {
      path: 'searchEventsDue',
      loadChildren: 'app/components/search-events-due/search-event-due.module#SearchEventDueModule',
    },
    {
      path: 'searchItems',
      loadChildren: 'app/components/search-items/search-items.module#SearchItemsModule',
    },
    {
      path: 'searchMonthlyTarget',
      loadChildren: 'app/components/search-monthly-target/search-monthly-target.module#SearchMonthlyTargetModule',
    }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(router);
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    appRouter,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
