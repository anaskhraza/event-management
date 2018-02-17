import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './components/home/home.module';
import { CreateEventModule } from './components/create-event/create-event.module';
import { ModuleWithProviders } from '@angular/core'
import { AppComponent } from './app.component';
// import { HomeComponent } from './components/home/home.component';
// import { CreateEventComponent } from './components/create-event/create-event.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
// import { SearchEventsComponent } from './components/search-events/search-events.component';


export const router: Routes = [
    {
        path: '',
        loadChildren: 'app/components/home/home.module#HomeModule',
        pathMatch: 'full'
    },
    {
      path: 'createEvent',
      loadChildren: 'app/components/create-event/create-event.module#CreateEventModule',
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
    appRouter,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
