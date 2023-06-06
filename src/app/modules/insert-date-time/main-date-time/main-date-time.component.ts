import { Component, SkipSelf, Inject } from '@angular/core'

import { SleepPeriod, EditDateTime, ILocalStorage } from '@model'
import { LOCAL_STORAGE_SERVICE } from '@token'

import { v4 as uuidv4 } from 'uuid'
import * as moment from 'moment'

@Component({
  selector: 'app-main-date-time',
  templateUrl: './main-date-time.component.html',
  styleUrls: ['./main-date-time.component.scss']
})
export class MainDateTimeComponent {

  constructor (
    @SkipSelf() @Inject(LOCAL_STORAGE_SERVICE) private readonly localStorageService: ILocalStorage
  ) { }

  editDateTimeValueChange (value: EditDateTime): void {
    const { sleep, awake, date } = { ...value }
    let payload: SleepPeriod = { uuid: '', date: '', start: '', end: '' }
    if (sleep && awake) {
      payload = {
        ...payload,
        uuid: uuidv4(),
        date: moment(date).format('YYYY-MM-DD'),
        start: sleep.replace(/AM|PM/, '').trim(),
        end: awake.replace(/AM|PM/, '').trim()
      }
    }
    const all: SleepPeriod[] = this.localStorageService.getParsedItems() as SleepPeriod[]
    all.push(payload)
    this.localStorageService.setItem(all)
  }
}
