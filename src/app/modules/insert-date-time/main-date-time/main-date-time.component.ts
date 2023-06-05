import { Component } from '@angular/core'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { FormControl, FormGroup } from '@angular/forms'


@Component({
  selector: 'app-main-date-time',
  templateUrl: './main-date-time.component.html',
  styleUrls: ['./main-date-time.component.scss']
})
export class MainDateTimeComponent {

  timeForm = new FormGroup({
    time: new FormControl<string | null>(''),
    date: new FormControl<Date | null>({ disabled: true, value: null }),
    currentDay: new FormControl(true),
  })

  get submitDisabled (): boolean {
    const { date, time } = { ...this.timeForm.getRawValue() as { date: Date | null, time: string | null } }
    return Object.values({ date, time }).filter(v => Boolean(v)).length < 2
  }

  private readonly getC = (c: 'time' | 'date' | 'currentDay'): FormControl => this.timeForm.get(c) as FormControl

  constructor () {
    this.initcurrentDaySubscription()
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
    this.timeForm.reset()
  }
}
