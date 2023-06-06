import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor (private readonly snackBar: MatSnackBar) { }

  showMessage (message: string, action = '', duration = 3000) {
    this.snackBar.open(message, action, { duration })
  }
}
