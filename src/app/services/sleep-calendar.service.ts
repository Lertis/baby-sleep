import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'

import { SleepPeriod } from '@model'

import * as moment from 'moment'

@Injectable()
export class SleepCalendarService {
  constructor (private readonly http: HttpClient) { }

  readonly getPreviewForDay = (day: Date | string | null): Observable<Array<SleepPeriod>> =>
    this.http.get<Array<SleepPeriod>>('assets/sleep-calendar.mock.json').pipe(
      map(values => values.filter(({ date }) => moment(day).isSame(date, 'day')))
    )

  readonly getPreviewForMonth = (month: number): Observable<Array<SleepPeriod>> =>
    this.http.get<Array<SleepPeriod>>('assets/sleep-calendar.mock.json').pipe(
      map(values => values.filter(({ date }) => moment(date).month() === month))
    )

  readonly saveSleepInfo = (payload: SleepPeriod): Observable<SleepPeriod> =>
    this.http.post<SleepPeriod>('path/to-create', { payload })

  readonly editSleepInfo = (payload: SleepPeriod): Observable<SleepPeriod> =>
    this.http.put<SleepPeriod>('path/to-update', { payload })

  readonly deleteSleepInfo = (payload: SleepPeriod): Observable<SleepPeriod> =>
    this.http.delete<SleepPeriod>('path/to-delete', { body: { payload } })
}
