import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ConfirmDialogComponent } from './confirm-dialog.component'

import { MATERIAL } from './material.module'

const ANGULAR = [CommonModule]

const COMPONENTS = [ConfirmDialogComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...ANGULAR,
    ...MATERIAL
  ],
  exports: [...COMPONENTS]
})
export class ConfirmDialogModule { }
