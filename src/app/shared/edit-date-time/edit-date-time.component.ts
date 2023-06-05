import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-edit-date-time',
  templateUrl: './edit-date-time.component.html',
  styleUrls: ['./edit-date-time.component.scss']
})
export class EditDateTimeComponent implements OnChanges {
  @Input() values!: {
    sleep?: string | null
    awake?: string | null
    date?: string | null
    currentDay?: boolean
  }

  @Output() valueChange = new EventEmitter<{
    sleep: string | null
    awake: string | null
    date: Date | null
    currentDay: boolean | null
  }>()

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

  private readonly getFormValues = (): { date: Date | null, sleep: string | null, awake: string | null, currentDay: boolean | null } => this.timeForm.getRawValue()

  constructor () {
    this.initcurrentDaySubscription()
  }

  ngOnChanges (changes: { values: SimpleChange }): void {
    const { values } = { ...changes }
    if (values?.currentValue) {
      const { sleep, awake, date } = { ...values.currentValue as { sleep: string | null, awake: string | null, date: string | null, } }
      if (sleep) {
        const dSleep = new Date(`${sleep}`)
        const hSleep = dSleep.getHours()
        const mSleep = dSleep.getMinutes()
        this.timeForm.controls.sleep.setValue(`${hSleep}:${mSleep}`)
      }

      if (awake) {
        const dAwake = new Date(`${awake}`)
        const hAwake = dAwake.getHours()
        const mAwake = dAwake.getMinutes()
        this.timeForm.controls.awake.setValue(`${hAwake}:${mAwake}`)
      }

      if (date) {
        this.timeForm.controls.date.setValue(new Date(`${date}`))
      }
    }
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

  sumbit (): void {
    this.valueChange.emit(this.getFormValues())
    this.timeForm.reset()
  }
}
