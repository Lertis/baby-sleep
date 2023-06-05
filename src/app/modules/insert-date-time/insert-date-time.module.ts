import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

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
  RouterModule.forChild(routes)
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR]
})
export class InsertDateTimeModule { }
