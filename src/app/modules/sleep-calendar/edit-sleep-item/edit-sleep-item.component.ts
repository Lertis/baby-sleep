import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { EditDateTime, SleepPeriod } from '@model'
import * as moment from 'moment'

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

  valueChange (value: EditDateTime): void {
    const payload: SleepPeriod = {
      uuid: this.data.uuid,
      date: moment(value.date).format('YYYY-MM-DD'),
      start: value.sleep.replace(/AM|PM/, '').trim(),
      end: value.awake.replace(/AM|PM/, '').trim()
    }
    this.dialogRef.close(payload)
  }
}
