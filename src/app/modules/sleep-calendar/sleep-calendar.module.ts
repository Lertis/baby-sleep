import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MainSleepCalendarComponent } from './main-sleep-calendar/main-sleep-calendar.component'

import { MATERIAL } from './material.module'
import { ConfirmDialogModule } from '../../shared/confirm-dialog/confirm-dialog.module'

const routes: Routes = [
  {
    path: '',
    component: MainSleepCalendarComponent
  }
]

const COMPONENTS = [MainSleepCalendarComponent]

const ANGULAR = [
  CommonModule,
  RouterModule.forChild(routes),
  FormsModule,
  ReactiveFormsModule
]

const LIBS = [
  ConfirmDialogModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR, ...MATERIAL, ...LIBS]
})
export class SleepCalendarModule { }
