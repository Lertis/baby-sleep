import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { EditDateTime, SleepPeriod } from '@model'

@Component({
  selector: 'app-edit-sleep-item',
  templateUrl: './edit-sleep-item.component.html',
  styleUrls: ['./edit-sleep-item.component.scss']
})
export class EditSleepItemComponent {
  values: EditDateTime

  constructor (
    @Inject(MAT_DIALOG_DATA) readonly data: SleepPeriod,
    readonly dialogRef: MatDialogRef<EditSleepItemComponent>) {
    const { date, start, end } = { ...this.data }
    this.values = { sleep: start, awake: end, date: new Date(date), currentDay: true }
  }

  valueChange (value: {
    awake: string | null
    currentDay: boolean | null
    date: Date | null
    sleep: string | null
  }) {
    console.log(value)
  }
}
