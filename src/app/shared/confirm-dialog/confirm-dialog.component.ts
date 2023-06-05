import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  text!: string

  constructor (
    @Inject(MAT_DIALOG_DATA) private readonly data: { text: string },
    readonly dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this.text = this.data.text
  }
}
