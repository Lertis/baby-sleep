import { Component, Inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DOCUMENT } from '@angular/common'
import { FormControl } from '@angular/forms'
import { MatDatepicker } from '@angular/material/datepicker'

import { delay, map, switchMap, tap } from 'rxjs'

import { calculateMostFrequentSleepHours } from '@util'
import { momentCalendarAdapters } from '@shared'
import { SleepCalendarService } from '@service'
import { SleepHourProbability } from '@model'

import * as moment from 'moment'

@Component({
  selector: 'app-main-sleep-statistic',
  templateUrl: './main-sleep-statistic.component.html',
  styleUrls: ['./main-sleep-statistic.component.scss'],
  providers: [
    ...momentCalendarAdapters()
  ]
})
export class MainSleepStatisticComponent {
  date = new FormControl();

  loading = false

  mostFrequentSleepHours: SleepHourProbability[] = []

  constructor (
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly sleepCalendarService: SleepCalendarService) {
    this.calendarChangeSubscription()
    this.date.setValue(moment(new Date()), { emitEvent: true })
  }

  openedCalendar () {
    const ctrlValue = this.date.value
    ctrlValue.year(new Date().getFullYear())
    this.date.setValue(ctrlValue)
    setTimeout(() => (this.document.getElementsByClassName('mat-calendar-body-active')[0] as HTMLButtonElement).click())
  }

  setMonthAndYear (normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value
    ctrlValue.month(normalizedMonthAndYear.month())
    ctrlValue.year(normalizedMonthAndYear.year())
    this.date.setValue(ctrlValue)
    datepicker.close()
  }

  private calendarChangeSubscription (): void {
    const sortFn = (a: SleepHourProbability, b: SleepHourProbability): number => {
      if (a.hour < b.hour) return -1
      else if (a.hour > b.hour) return 1
      else return 0
    }
    this.date.valueChanges.pipe(
      takeUntilDestroyed(),
      map(v => moment(v).month()),
      tap(() => this.loading = true),
      switchMap(month => this.sleepCalendarService.getPreviewForMonth(month)),
      delay(1500),
      map(sleepPeriods => calculateMostFrequentSleepHours(sleepPeriods)),
      map(mostFrequentSleepHours => mostFrequentSleepHours.sort((a, b) => sortFn(a, b)))
    ).subscribe(mostFrequentSleepHours => {
      this.mostFrequentSleepHours = [...mostFrequentSleepHours]
      this.loading = false
    })
  }
}
