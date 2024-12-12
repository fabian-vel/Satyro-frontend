import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./shared/material/material.module";
import { EventComponent } from './component/event/event.component';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import { TimepickerComponent } from './component/timepicker/timepicker.component';
import {PrimeNGModule} from "./shared/prime-ng/prime-ng.module";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    ToolbarComponent,
    TimepickerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        PrimeNGModule,
        NgOptimizedImage
    ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
