import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-sleep-item',
  templateUrl: './edit-sleep-item.component.html',
  styleUrls: ['./edit-sleep-item.component.scss']
})
export class EditSleepItemComponent {
  constructor (
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    readonly dialogRef: MatDialogRef<EditSleepItemComponent>) {
  }
}
