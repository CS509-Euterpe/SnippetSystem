import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service'
import { DtoToSnippet, ISnippet } from 'src/app/models/models';
import { CommentStub } from 'src/app/models/stubs';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { UserAccessEnum } from 'src/app/models/enums';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent implements OnInit {

  snippet: ISnippet
  id: number

  private _user = UserAccessEnum.None
  
  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit(): void {    
    this.id = this.getRouteId();
    //call out to server to fetch the snippet
    this.getSnippetBody(this.id);

    this.route.params.subscribe( routeParams => {
      this.getSnippetBody(routeParams.id)
    })

    this.route.queryParams
    .subscribe(params => { 
      if (params.user == "creator") {
        this._user = UserAccessEnum.Creator
      }
    });
  }

  getRouteId(): number {
    var strId = this.route.snapshot.paramMap.get('id');
    return parseInt(strId);
  }

  getSnippetBody(snipId: number): void {

    this.api.getSnippet(snipId).subscribe(
      x => {     
        this.snippet = DtoToSnippet(x)
      }, 
      err => this.snackbar.showError(err.message)
    );
  }

  get isCreator()
  {
    return this._user == UserAccessEnum.Creator;
  }

  save(): void {
    //send update snippet request
    this.snippet.comments = []
    this.api.updateSnippet(this.snippet).subscribe(
      x => {
        this.snackbar.showMessage("Saved!")
      },
      err => this.snackbar.showError(err.message),
      () => this.getSnippetBody(this.snippet.id)
    )
  }

}
