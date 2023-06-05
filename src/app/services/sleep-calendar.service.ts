import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'

import { SleepPeriod } from '@model'

import * as moment from 'moment'

@Injectable({ providedIn: 'root' })
export class SleepCalendarService {
  constructor (private readonly http: HttpClient) { }

  readonly getPreviewForDay = (day: Date | string | null) =>
    this.http.get<Array<SleepPeriod>>('assets/sleep-calendar.mock.json').pipe(
      map(values => values.filter(({ date }) => moment(day).isSame(date, 'day')))
    )

  readonly getPreviewForMonth = (month: number) =>
    this.http.get<Array<SleepPeriod>>('assets/sleep-calendar.mock.json').pipe(
      map(values => values.filter(({ date }) => moment(date).month() === month))
    )
}
