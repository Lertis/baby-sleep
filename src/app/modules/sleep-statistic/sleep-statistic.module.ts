import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MainSleepStatisticComponent } from './main-sleep-statistic/main-sleep-statistic.component'

import { MATERIAL } from './material.module'

const routes: Routes = [
  {
    path: '',
    component: MainSleepStatisticComponent
  }
]

const COMPONENTS = [MainSleepStatisticComponent]

const ANGULAR = [
  CommonModule,
  RouterModule.forChild(routes),
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR, ...MATERIAL]
})
export class SleepStatisticModule { }
