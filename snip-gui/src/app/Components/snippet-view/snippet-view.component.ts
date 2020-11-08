import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service'
import { DtoToSnippet, IAddComment, IComment, ISnippet } from 'src/app/models/models';
import { CommentStub } from 'src/app/models/stubs';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent implements OnInit {

  snippet: ISnippet
  id: number

  constructor(
    public dialog: MatDialog,
    private api: ApiRequestsService,
    private snackbar: SnackbarService,
    private route: ActivatedRoute
  )
  { }

  ngOnInit(): void {    
    this.id = this.getRouteId();
    //call out to server to fetch the snippet
    this.getSnippetBody(this.id);

    this.route.params.subscribe( routeParams => {
      this.getSnippetBody(routeParams.id)
    })
  }

  //Opens modal dialog
  addComment(): void {

    console.log(location)
    const dialogRef = this.dialog.open(AddCommentModalDialog, {
      width: '600px',
      height: '600px',
      data: { snippetId: this.snippet.id,
              timestamp: new Date().toISOString().split('T')[0],
              text: "",
              name: "",
              region: {
                start: 0,
                end: 0
              }}
    });

    //refresh the comments that are on the page...
    // dialogRef.afterClosed().toPromise().then(
    //   x => this.refreshComments()
    // )

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

  refreshComments(): void {
    //refresh the page to hold all of the new comments...
    this.api.getComments(this.snippet.id).subscribe(
      x => {console.log(x)},
      err => this.snackbar.showError(err),
      () => this.snackbar.showMessage("snippet comments refreshed")
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

}

/* Add Comment Modal */
@Component({
  selector: 'add-comment-modal',
  templateUrl: 'add-comment-modal.html',
  styleUrls: ['./add-comment-modal.css']
})
export class AddCommentModalDialog {
  
  newComment: IAddComment; 

  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddCommentModalDialog>,
    @Inject(MAT_DIALOG_DATA) public comment: IAddComment
  ){
    this.newComment = comment;
  }

  create(): void {
    //make api call to write snippet to DB
    this.api.createComment(this.newComment).subscribe(
      x => {console.log(x)},
      err => this.snackbar.showMessage(err),
      () => {this.dialogRef.close()}
    )
  }
}