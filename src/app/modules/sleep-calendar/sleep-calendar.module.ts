import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { MainSleepCalendarComponent } from './main-sleep-calendar/main-sleep-calendar.component'

const routes: Routes = [
  {
    path: '',
    component: MainSleepCalendarComponent
  }
]

const COMPONENTS = [MainSleepCalendarComponent]

const ANGULAR = [
  CommonModule,
  RouterModule.forChild(routes)
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR]
})
export class SleepCalendarModule { }
