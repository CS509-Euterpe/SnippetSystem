import { Component, OnInit } from '@angular/core';
import { ISnippetDto } from 'src/app/models/models';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  allSnippets: ISnippetDto[];

  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  getSnippets(): void {

    console.log("getting all snippets");
  
    //build up the list of snippets
    this.api.getAllSnippets().subscribe(
      (data: ISnippetDto[]) => {
        console.log(data);
        this.allSnippets = data;
      },
      err => {
        console.log(err);
        this.snackbar.showError(err)
      },
      () => console.log(this.allSnippets)
    );
  }


}
