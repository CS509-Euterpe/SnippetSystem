import { Component, OnInit } from '@angular/core';
import { IModifySnippet, ISnippetDto } from 'src/app/models/models';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  allSnippets: IModifySnippet[]; //server returns this same object
  olderThanDate: Date;
  todayDate: Date;

  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService
  ) {
    this.todayDate = new Date();
   }

  ngOnInit(): void {
    this.getSnippets();
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
    if(this.olderThanDate < this.todayDate)
    {
      let olderThan =  Math.round((this.todayDate.getTime() - this.olderThanDate.getTime()) / (1000 * 3600 * 24));

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
