import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { MATERIAL } from './material.module'

const ANGULAR = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
