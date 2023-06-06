import { Inject, Injectable } from '@angular/core'
import { Observable, map, of } from 'rxjs'

import { ILocalStorage, SleepPeriod } from '@model'
import { LOCAL_STORAGE_SERVICE } from '@token'

import * as moment from 'moment'

@Injectable()
export class SleepCalendarService {
  constructor (@Inject(LOCAL_STORAGE_SERVICE) private readonly localStorageService: ILocalStorage) { }

  readonly getPreviewForDay = (day: Date | string | null): Observable<Array<SleepPeriod>> =>
    of<Array<SleepPeriod>>(this.localStorageService.getParsedItems() as SleepPeriod[]).pipe(
      map(values => values.filter(({ date }) => moment(day).isSame(date, 'day')))
    )

  readonly getPreviewForMonth = (month: number): Observable<Array<SleepPeriod>> =>
    of<Array<SleepPeriod>>(this.localStorageService.getParsedItems() as SleepPeriod[]).pipe(
      map(values => values.filter(({ date }) => moment(date).month() === month))
    )
}
