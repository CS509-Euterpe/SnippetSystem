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

  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getSnippets();
  }

  getSnippets(): void {

    console.log("getting all snippets");
  
    //build up the list of snippets
    this.api.getAllSnippets().subscribe(
      x => {
        console.log(x);
        this.allSnippets = x as IModifySnippet[]; 
      },
      err => {
        console.log(err);
        this.snackbar.showError(err)
      },
      () => console.log("DONE")
    );
  }

  removeOldSnippets(): void {

    console.log("removing old snippets");

    //calculate "older than" based on selected date & todays date

    let olderThan = 4;//TODO Calculate :) 

    //Send request to API to remove snippet older than calculated day
    this.api.deleteStaleSnippets(olderThan).subscribe(
      x => {
        console.log(x);
      },
      err => {
        this.snackbar.showError(err)
      },
      () => {
        this.getSnippets()
      } //refresh snippets on the admin page
    ) 

  }


}
