import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { MatCalendar } from '@angular/material/datepicker'
import { Subject, delay, filter, switchMap, takeUntil, tap } from 'rxjs'

import { SleepCalendarService } from '@service'
import { SleepPeriod } from '@model'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component'

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

  constructor (
    private readonly sleepCalendarService: SleepCalendarService,
    private readonly dialog: MatDialog) {
  }

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

  deleteItem (item: SleepPeriod) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { text: 'Ви впевнені?' }, width: '50vw', height: '20vh'
    }).afterClosed().pipe(
      filter(v => Boolean(v))
    ).subscribe(() => {
      console.log('Delete aciton')
    })
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
