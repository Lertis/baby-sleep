import { Component } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup } from '@angular/forms'

import { v4 as uuidv4 } from 'uuid'
import * as moment from 'moment'


@Component({
  selector: 'app-main-date-time',
  templateUrl: './main-date-time.component.html',
  styleUrls: ['./main-date-time.component.scss']
})
export class MainDateTimeComponent {
  timeForm = new FormGroup<{
    sleep: FormControl<string | null>
    awake: FormControl<string | null>
    date: FormControl<Date | null>
    currentDay: FormControl<boolean | null>
  }>({
    sleep: new FormControl<string | null>(''),
    awake: new FormControl<string | null>(''),
    date: new FormControl<Date | null>({ disabled: true, value: new Date() }),
    currentDay: new FormControl(true),
  })

  get submitDisabled (): boolean {
    const { date, sleep, awake } = { ...this.getFormValues() }
    return Object.values({ date, sleep, awake }).filter(v => Boolean(v)).length < Object.keys({ date, sleep, awake }).length
  }

  private readonly getFormValues = (): { date: Date | null, sleep: string | null, awake: string | null } => this.timeForm.getRawValue()

  constructor () {
    this.initcurrentDaySubscription()
  }

  private initcurrentDaySubscription (): void {
    this.timeForm.controls.currentDay.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(v => {
      if (v) {
        this.timeForm.controls.date.disable()
        this.timeForm.controls.date.setValue(new Date())
      } else {
        this.timeForm.controls.date.enable()
      }
    })
  }

  sumbit () {
    const { sleep, awake, date } = { ...this.getFormValues() }
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
    this.timeForm.reset()
  }
}
