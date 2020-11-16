import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service'
import { DtoToSnippet, IAddComment, IComment, IRegion, ISnippet } from 'src/app/models/models';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAccessEnum } from 'src/app/models/enums';
import { BaseSnippetComponent } from '../base-snippet/base-snippet-component';
import { SnippetPanelComponent } from '../snippet-panel/snippet-panel.component';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent extends BaseSnippetComponent {

  snippet: ISnippet
  id: number

  @ViewChild(SnippetPanelComponent) snipPanel: SnippetPanelComponent;
  
  constructor(
    public dialog: MatDialog,
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

  }

  //Opens modal dialog
  addComment(): void {

    console.log("this is the current region:");
    console.log("direct fetch...")
    console.log(this.snipPanel.selection);

    const dialogRef = this.dialog.open(AddCommentModalDialog, {
      width: '600px',
      height: '450px',
      data: { snippetId: this.snippet.id,
              timestamp: new Date().toISOString().split('T')[0],
              text: "",
              name: "",
              region: this.snipPanel.selection
            }
    });

    //refresh the comments that are on the page...
    dialogRef.afterClosed().toPromise().then(
      x => {
        this.refreshComments();
        this.snipPanel.clearHighlighting();
      } 
    )

  }

  getRouteId(): number {
    var strId = this.route.snapshot.paramMap.get('id');
    return parseInt(strId);
  }

  getSnippetBody(snipId: number): void {
    this.api.getSnippet(snipId).subscribe(
      x => {     
        this.snippet = DtoToSnippet(x)
        this.sortComments(); 
      }, 
      err => this.snackbar.showError(err.message)
    );
  }

  refreshComments(): void {
    this.snackbar.showMessage("refreshing comments");
    this.api.getComments(this.snippet.id).subscribe(
      x => {
        this.snippet.comments = x;
        this.sortComments();
      },
      err => this.snackbar.showError(err),
      () => this.snackbar.showMessage("done")
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
      err => this.snackbar.showError(err.message)
    )
  }

  /** When a user clicks on a comment. display the highlighted region... */
  displayHighlight(comment: IComment): void {
    this.snipPanel.clearHighlighting();
    this.snipPanel.highlightRegion(comment.region);
  }

  sortComments(): void {
    console.log("sort");
    this.snippet.comments.reverse();
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
      () => {this.dialogRef.close(); console.log("DONE")}
    )   
  }
}