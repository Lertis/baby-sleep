import { AfterViewInit, Component, OnDestroy, OnInit, Self, SkipSelf, ViewChild, Inject, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core'
import { MatCalendar } from '@angular/material/datepicker'
import { MatDialog } from '@angular/material/dialog'

import { Subject, Subscription, delay, filter, switchMap, takeUntil, tap } from 'rxjs'

import { SleepCalendarService, SnackBarService } from '@service'
import { ILocalStorage, SleepPeriod } from '@model'
import { ConfirmDialogComponent } from '@shared'
import { LOCAL_STORAGE_SERVICE } from '@token'

import { EditSleepItemComponent } from '../edit-sleep-item/edit-sleep-item.component'

import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-main-sleep-calendar',
  templateUrl: './main-sleep-calendar.component.html',
  styleUrls: ['./main-sleep-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SleepCalendarService]
})
export class MainSleepCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  reloadSubscription: Subscription

  selected!: Date | null

  sleepStatisticByDay: SleepPeriod[] = []

  loading = false

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>

  readonly trackByFn = (_: number, item: SleepPeriod): string => item.uuid

  constructor (
    @Self() private readonly sleepCalendarService: SleepCalendarService,
    @SkipSelf() @Inject(LOCAL_STORAGE_SERVICE) private readonly localStorageService: ILocalStorage,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly snackBarService: SnackBarService) {
  }

  ngOnInit (): void {
    const date = new Date()
    this.selected = date
    this.loading = true
    this.sleepCalendarService.getPreviewForDay(date).pipe(
      takeUntil(this.destroy$),
      delay(500)
    ).subscribe(values => {
      this.sleepStatisticByDay = cloneDeep(values)
      this.loading = false
      this.calendar.updateTodaysDate()
      this.cdr.detectChanges()
    })
  }

  ngAfterViewInit (): void {
    this.calendar.selectedChange.pipe(
      takeUntil(this.destroy$),
      filter(v => Boolean(v)),
      tap(() => this.loading = true),
      delay(500),
      switchMap((date: Date | null) => this.sleepCalendarService.getPreviewForDay(date))
    ).subscribe(values => {
      this.sleepStatisticByDay = cloneDeep(values)
      this.loading = false
      this.cdr.detectChanges()
    })
  }

  editItem (item: SleepPeriod): void {
    this.dialog.open<EditSleepItemComponent, SleepPeriod, SleepPeriod>(EditSleepItemComponent, {
      data: { ...item }
    }).afterClosed().pipe(
      filter(v => Boolean(v))
    ).subscribe((payload: SleepPeriod) => {
      this.localStorageService.updateItem(item.uuid, payload)
      this.snackBarService.showMessage('Успішно оновлено!')
      this.reloadData()
    })
  }

  deleteItem (item: SleepPeriod): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: { text: 'Ви впевнені?' }, width: '50vw', height: '20vh'
    }).afterClosed().pipe(
      filter(v => Boolean(v))
    ).subscribe(() => {
      this.localStorageService.removeItem(item.uuid)
      this.snackBarService.showMessage('Видалено успішно!')
      this.reloadData()
    })
  }

  private reloadData () {
    this.loading = true
    this.reloadSubscription?.unsubscribe()
    this.reloadSubscription = this.sleepCalendarService.getPreviewForDay(this.selected).subscribe(values => {
      this.sleepStatisticByDay = cloneDeep(values)
      this.loading = false
      this.cdr.detectChanges()
    })
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
    this.reloadSubscription?.unsubscribe()
  }
}
