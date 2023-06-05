import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-main-date-time',
  templateUrl: './main-date-time.component.html',
  styleUrls: ['./main-date-time.component.scss']
})
export class MainDateTimeComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>()

  timeForm = new FormGroup({
    time: new FormControl(''),
    date: new FormControl({ disabled: true, value: '' }),
    currentDay: new FormControl(true),
  })

  get submitDisabled (): boolean {
    const { date, time } = { ...this.timeForm.getRawValue() as { date: Date, time: string } }
    return Object.values({ date, time }).filter(v => Boolean(v)).length < 2
  }

  private readonly getC = (c: 'time' | 'date' | 'currentDay'): FormControl => this.timeForm.get(c) as FormControl

  constructor () {
    this.initcurrentDaySubscription()
  }

  private initcurrentDaySubscription (): void {
    this.getC('currentDay').valueChanges.pipe(
      takeUntil(this.destroy$)
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

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
