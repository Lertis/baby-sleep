import { AfterViewInit, Component, OnDestroy, OnInit, Self, ViewChild } from '@angular/core'
import { MatCalendar } from '@angular/material/datepicker'
import { MatDialog } from '@angular/material/dialog'

import { Subject, delay, filter, switchMap, takeUntil, tap } from 'rxjs'

import { SleepCalendarService } from '@service'
import { SleepPeriod } from '@model'
import { ConfirmDialogComponent } from '@shared'

import { EditSleepItemComponent } from '../edit-sleep-item/edit-sleep-item.component'

@Component({
  selector: 'app-main-sleep-calendar',
  templateUrl: './main-sleep-calendar.component.html',
  styleUrls: ['./main-sleep-calendar.component.scss'],
  providers: [SleepCalendarService]
})
export class MainSleepCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()

  selected!: Date | null

  sleepStatisticByDay: SleepPeriod[] = []

  loading = false

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>

  readonly trackByFn = (_: number, item: SleepPeriod) => item.uuid

  constructor (
    @Self() private readonly sleepCalendarService: SleepCalendarService,
    private readonly dialog: MatDialog) {
  }

  ngOnInit (): void {
    const date = new Date()
    this.selected = date
    this.loading = true
    this.sleepCalendarService.getPreviewForDay(date).pipe(
      takeUntil(this.destroy$),
      delay(1500)
    ).subscribe(values => {
      this.sleepStatisticByDay = [...values]
      this.loading = false
      this.calendar.updateTodaysDate()
    })
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

  editItem (item: SleepPeriod): void {
    this.dialog.open<EditSleepItemComponent, SleepPeriod, SleepPeriod>(EditSleepItemComponent, {
      data: { ...item }
    }).afterClosed().pipe(
      filter(v => Boolean(v))
    ).subscribe((payload: SleepPeriod) => {
      this.sleepCalendarService.editSleepInfo(payload) // change with using switchMap
    })
  }

  deleteItem (item: SleepPeriod): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: { text: 'Ви впевнені?' }, width: '50vw', height: '20vh'
    }).afterClosed().pipe(
      filter(v => Boolean(v))
    ).subscribe(() => {
      this.sleepCalendarService.deleteSleepInfo(item) // change with using switchMap
    })
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
