import { Component } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup } from '@angular/forms'

import * as moment from 'moment'


@Component({
  selector: 'app-main-date-time',
  templateUrl: './main-date-time.component.html',
  styleUrls: ['./main-date-time.component.scss']
})
export class MainDateTimeComponent {
  timeForm = new FormGroup({
    sleep: new FormControl<string | null>(''),
    awake: new FormControl<string | null>(''),
    date: new FormControl<Date | null>({ disabled: true, value: new Date() }),
    currentDay: new FormControl(true),
  })

  get submitDisabled (): boolean {
    const { date, sleep, awake } = { ...this.getFormValues() }
    const payload = { date, sleep, awake }
    return Object.values(payload).filter(v => Boolean(v)).length < Object.keys(payload).length
  }

  private readonly getFormValues = (): { date: Date | null, sleep: string | null, awake: string | null } => this.timeForm.getRawValue()

  private readonly getC = (c: 'time' | 'date' | 'currentDay'): FormControl => this.timeForm.get(c) as FormControl

  constructor () {
    this.initcurrentDaySubscription()
  }

  hourSelected (e: any) {
    console.log(e)
  }

  private initcurrentDaySubscription (): void {
    this.getC('currentDay').valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(v => {
      if (v) {
        this.getC('date').disable()
        this.getC('date').setValue(new Date())
      } else {
        this.getC('date').enable()
      }
    })
  }

  sumbit () {
    const { sleep, awake, date } = { ...this.getFormValues() }
    let payload: { date?: string, start?: string, end?: string } = { date: '', start: '', end: '' }
    if (sleep && awake) {
      payload = {
        ...payload,
        date: moment(date).format('YYYY-MM-DD'),
        start: sleep.replace(/AM|PM/, '').trim(),
        end: awake.replace(/AM|PM/, '').trim()
      }
    }
    console.log(payload)
    this.timeForm.reset()
  }
}
