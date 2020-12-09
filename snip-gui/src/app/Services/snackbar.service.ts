import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private position: MatSnackBarVerticalPosition = "bottom";
  private duration = 2000;

  private options: MatSnackBarConfig = {
    duration: this.duration,
    verticalPosition: this.position,
    panelClass: ["snackbar-message"]
  };

  private errorOptions: MatSnackBarConfig = {     
    duration: this.duration,
    verticalPosition: this.position,
    panelClass: ["snackbar-error"]
  }

  constructor(private _snackBar: MatSnackBar) { }

  public showMessage(message: string){
    this._snackBar.open(message, 'Ok', this.options);
  }

  public showError(message: string){
    this._snackBar.open(message, 'Ok', this.errorOptions)
  }
}
