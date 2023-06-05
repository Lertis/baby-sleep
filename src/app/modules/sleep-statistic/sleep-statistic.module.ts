import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router';
import { MainSleepStatisticComponent } from './main-sleep-statistic/main-sleep-statistic.component'

const routes: Routes = [
  {
    path: '',
    component: MainSleepStatisticComponent
  }
]

const COMPONENTS = [MainSleepStatisticComponent]

const ANGULAR = [
  CommonModule,
  RouterModule.forChild(routes)
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...ANGULAR]
})
export class SleepStatisticModule { }
