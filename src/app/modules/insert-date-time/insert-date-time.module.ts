import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { MainDateTimeWrapComponent } from './main-date-time-wrap/main-date-time-wrap.component'

const routes: Routes = [
  {
    path: '',
    component: MainDateTimeWrapComponent
  }
]

const COMPONENTS = [MainDateTimeWrapComponent]

const ANGULAR = [
  CommonModule,
  RouterModule.forChild(routes)
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR]
})
export class InsertDateTimeModule { }
