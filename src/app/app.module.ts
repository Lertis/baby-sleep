import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LOCAL_STORAGE_SERVICE, LOCAL_STORAGE_TOKEN } from '@token'
import { SleepLocalStorageService } from '@service'

import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { MATERIAL } from './material.module'

const ANGULAR = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [...ANGULAR, ...MATERIAL],
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { disabled: true }
    },
    {
      provide: LOCAL_STORAGE_TOKEN,
      useValue: 'sleep'
    },
    {
      provide: LOCAL_STORAGE_SERVICE,
      useClass: SleepLocalStorageService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
