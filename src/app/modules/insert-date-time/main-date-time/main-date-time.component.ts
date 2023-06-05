import { Component, Self } from '@angular/core'

import { SleepCalendarService } from '@service'
import { SleepPeriod, EditDateTime } from '@model'

import { v4 as uuidv4 } from 'uuid'
import * as moment from 'moment'

@Component({
  selector: 'app-main-date-time',
  templateUrl: './main-date-time.component.html',
  styleUrls: ['./main-date-time.component.scss'],
  providers: [SleepCalendarService]
})
export class MainDateTimeComponent {

  constructor (@Self() private readonly sleepCalendarService: SleepCalendarService) { }

  editDateTimeValueChange (value: EditDateTime) {
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
    this.sleepCalendarService.saveSleepInfo(payload)
  }
}
