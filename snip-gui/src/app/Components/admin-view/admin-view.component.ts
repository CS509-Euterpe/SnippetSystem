import { Component, OnInit } from '@angular/core';
import { IModifySnippet, ISnippetDto } from 'src/app/models/models';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordWallComponent } from 'src/app/password-wall/password-wall.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  allSnippets: IModifySnippet[]; //server returns this same object
  olderThanDate: Date;
  todayDate: Date;
  adminPassword: String;
  showadmin: Boolean; 

  constructor(
    public dialog: MatDialog,
    private api: ApiRequestsService,
    private snackbar: SnackbarService
  ) {
    this.todayDate = new Date();
    this.adminPassword = "admin";
   }

  ngOnInit(): void {
    //show password to user...
    this.showadmin = false;
    this.authenticatePassword(this.adminPassword);
    this.getSnippets();
  }

    /**
   * Opens modal dialog for password verificaion process
   * @param pwd correct password to view the snippet
   */
  authenticatePassword(pwd: String): void {

    if(pwd != undefined && pwd != '')
    {
      console.log("showing dialog");
      const dialogRef = this.dialog.open(PasswordWallComponent, {
        disableClose: true,
        width: '50%',
        height: '50%',
        data: pwd,
      })

      dialogRef.afterClosed().toPromise().then(
        x => {
          this.showadmin = true; 
        }
      )

    }
    else
    {
      this.showadmin = true;
    }
  }


  getSnippets(): void {
    //build up the list of snippets
    this.api.getAllSnippets().subscribe(
      x => {
        this.allSnippets = x as IModifySnippet[]; 
      },
      err => {
        console.error(err);
        this.snackbar.showError(err)
      },
      () => this.snackbar.showMessage("Snippets refreshed")
    );
  }

  removeOldSnippets(): void {

    //calculate "older than" based on selected date & todays date
    let olderThan =  Math.round((this.todayDate.getTime() - this.olderThanDate.getTime()) / (1000 * 3600 * 24));
    
    if(olderThan >= 0)
    {
      this.snackbar.showMessage(`Removing snippets older than ${olderThan} day(s)`);    
      //Send request to API to remove snippet older than calculated day
      this.api.deleteStaleSnippets(olderThan).subscribe(
        x => {
          this.snackbar.showMessage(`Removing snippets older than ${olderThan} day(s)`);
        },
        err => {
          this.snackbar.showError(err);
        },
        () => {
          this.snackbar.showMessage(`Snippets older than ${olderThan} day(s) removed!`);
          this.getSnippets();
        }
      ) 
    }
    else
    {
      this.snackbar.showError("cannot remove in this range!");
    }

  }
}
