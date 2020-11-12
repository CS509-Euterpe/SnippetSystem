import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service'
import { DtoToSnippet, ISnippet } from 'src/app/models/models';
import { CommentStub } from 'src/app/models/stubs';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { UserAccessEnum } from 'src/app/models/enums';
import { BaseSnippetComponent } from '../base-snippet/base-snippet-component';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent extends BaseSnippetComponent {

  snippet: ISnippet
  id: number
  
  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService,
    private router: Router,
    route: ActivatedRoute
  ) {
    super(route)
   }

  ngOnInit(): void { 
    super.ngOnInit()   
    this.id = this.getRouteId();
    //call out to server to fetch the snippet
    this.getSnippetBody(this.id);

    this.route.params.subscribe( routeParams => {
      this.getSnippetBody(routeParams.id)
    })
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

  delete(): void {
    this.api.deleteSnippet(this.snippet.id, this.isCreator? UserAccessEnum.Creator : UserAccessEnum.Viewer).subscribe(
      x => 
      {
        this.snackbar.showMessage("Deleted Snippet")
        this.router.navigate(['home']);
      },
      err => this.snackbar.showMessage(err.message)
    )
  }

}
