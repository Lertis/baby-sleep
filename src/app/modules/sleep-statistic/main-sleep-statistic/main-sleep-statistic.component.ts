import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { FormControl } from '@angular/forms'
import { MatDatepicker } from '@angular/material/datepicker'

import { momentCalendarAdapters } from '../../../shared'

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
  date = new FormControl(moment());

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  openedCalendar () {
    const ctrlValue = this.date.value!
    ctrlValue.year(new Date().getFullYear())
    this.date.setValue(ctrlValue)
    setTimeout(() => (this.document.getElementsByClassName('mat-calendar-body-active')[0] as HTMLButtonElement).click())
  }

  setMonthAndYear (normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value!
    ctrlValue.month(normalizedMonthAndYear.month())
    ctrlValue.year(normalizedMonthAndYear.year())
    this.date.setValue(ctrlValue)
    datepicker.close()
  }
}
