import { Component, Inject, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../Services/snackbar.service';

@Component({
  selector: 'app-password-wall',
  templateUrl: './password-wall.component.html',
  styleUrls: ['./password-wall.component.css']
})
export class PasswordWallComponent implements OnInit {

  guess: String;
  real: String;

  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<PasswordWallComponent>,
    @Inject(MAT_DIALOG_DATA) public password: String, 

  ) { this.real = password;   }

  ngOnInit(): void {

  }

  checkPassword(): void {

    if(this.password == this.guess)
    {
      
      this.snackbar.showMessage("Password Correct!");
      this.dialogRef.close();
    }
    else
    {
      this.snackbar.showError("Incorrect Password!");
    }

  }

  goHome(): void {
    this.router.navigateByUrl('home');
    this.dialogRef.close();
  }

}
