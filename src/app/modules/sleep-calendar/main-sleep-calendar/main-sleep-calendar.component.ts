import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { MatCalendar } from '@angular/material/datepicker'
import { Subject, delay, filter, switchMap, takeUntil, tap } from 'rxjs'

import { SleepCalendarService } from '../../../services'

import { SleepPeriod } from '../../../models'

@Component({
  selector: 'app-main-sleep-calendar',
  templateUrl: './main-sleep-calendar.component.html',
  styleUrls: ['./main-sleep-calendar.component.scss']
})
export class MainSleepCalendarComponent implements AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()

  selected!: Date | null

  sleepStatisticByDay: SleepPeriod[] = []

  loading = false

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>

  constructor(private readonly sleepCalendarService: SleepCalendarService) {}

  ngAfterViewInit (): void {
    this.calendar.selectedChange.pipe(
      takeUntil(this.destroy$),
      filter(v => Boolean(v)),
      tap(() => this.loading = true),
      delay(1500),
      switchMap((date: Date | null) => this.sleepCalendarService.getPreviewForDay(date))
    ).subscribe(values => {
      this.sleepStatisticByDay = [...values]
      this.loading = false
    })
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
