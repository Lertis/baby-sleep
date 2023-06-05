import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker'

import { MainDateTimeComponent } from './main-date-time/main-date-time.component'

const routes: Routes = [
  {
    path: '',
    component: MainDateTimeComponent
  }
]

const COMPONENTS = [MainDateTimeComponent]

const ANGULAR = [
  CommonModule,
  RouterModule.forChild(routes),
  FormsModule,
  ReactiveFormsModule
]

const LIBS = [
  NgxMatTimepickerModule
]

const MATERIAL = [
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR, ...LIBS, ...MATERIAL]
})
export class InsertDateTimeModule { }
