import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { EditDateTimeModule, ConfirmDialogModule } from '@shared'

import { MATERIAL } from './material.module'

import { MainSleepCalendarComponent } from './main-sleep-calendar/main-sleep-calendar.component'
import { EditSleepItemComponent } from './edit-sleep-item/edit-sleep-item.component'
import { ActiveTimePipe } from './active-time.pipe'

const routes: Routes = [
  {
    path: '',
    component: MainSleepCalendarComponent
  }
]

const COMPONENTS = [MainSleepCalendarComponent, EditSleepItemComponent]

const PIPES = [ActiveTimePipe]

const ANGULAR = [
  CommonModule,
  RouterModule.forChild(routes),
  FormsModule,
  ReactiveFormsModule
]

const LIBS = [
  ConfirmDialogModule,
  EditDateTimeModule
]

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [...ANGULAR, ...MATERIAL, ...LIBS]
})
export class SleepCalendarModule { }
