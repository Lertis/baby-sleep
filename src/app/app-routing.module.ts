import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { RoutePath } from './const'

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.DATE_TIME,
    pathMatch: 'full'
  },
  {
    path: RoutePath.DATE_TIME,
    loadChildren: () => import('./modules/insert-date-time/insert-date-time.module').then(({ InsertDateTimeModule }) => InsertDateTimeModule)
  },
  {
    path: RoutePath.SLEEP_CALENDAR,
    loadChildren: () => import('./modules/sleep-calendar/sleep-calendar.module').then(({ SleepCalendarModule }) => SleepCalendarModule)
  },
  {
    path: RoutePath.STATISTIC,
    loadChildren: () => import('./modules/sleep-statistic/sleep-statistic.module').then(({ SleepStatisticModule }) => SleepStatisticModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/not-found/not-found.module').then(({ NotFoundModule }) => NotFoundModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
