import { Component } from '@angular/core'

import { v4 as uuidv4 } from 'uuid'
import * as moment from 'moment'


@Component({
  selector: 'app-main-date-time',
  templateUrl: './main-date-time.component.html',
  styleUrls: ['./main-date-time.component.scss']
})
export class MainDateTimeComponent {
  values = {
    sleep: new Date().toString(),
    date: new Date('2022-09-02').toString(),
    currentDay: true
  }

  editDateTimeValueChange (value: { date: Date | null, sleep: string | null, awake: string | null, currentDay: boolean | null }) {
    const { sleep, awake, date } = { ...value }
    let payload: { uuid: string, date?: string, start?: string, end?: string } = { uuid: '', date: '', start: '', end: '' }
    if (sleep && awake) {
      payload = {
        ...payload,
        uuid: uuidv4(),
        date: moment(date).format('YYYY-MM-DD'),
        start: sleep.replace(/AM|PM/, '').trim(),
        end: awake.replace(/AM|PM/, '').trim()
      }
    }
    console.log(payload)
  }
}
