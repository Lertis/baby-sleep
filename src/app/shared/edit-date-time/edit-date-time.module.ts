import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgxMatTimepickerModule } from 'ngx-mat-timepicker'

import { MATERIAL } from './material.module'
import { EditDateTimeComponent } from './edit-date-time.component'

const ANGULAR = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
]

const LIBS = [
  NgxMatTimepickerModule
]

@NgModule({
  declarations: [EditDateTimeComponent],
  imports: [...ANGULAR, ...LIBS, ...MATERIAL],
  exports: [EditDateTimeComponent]
})
export class EditDateTimeModule { }
