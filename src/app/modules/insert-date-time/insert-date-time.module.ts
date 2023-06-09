import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { EditDateTimeModule } from '@shared'

import { MainDateTimeComponent } from './main-date-time/main-date-time.component'
import { MATERIAL } from './material.module'

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
]

const LIBS = [
  EditDateTimeModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR, ...LIBS, ...MATERIAL]
})
export class InsertDateTimeModule { }
