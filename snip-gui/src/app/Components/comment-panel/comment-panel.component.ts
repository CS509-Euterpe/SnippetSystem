import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/models';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-comment-panel',
  templateUrl: './comment-panel.component.html',
  styleUrls: ['./comment-panel.component.css']
})
export class CommentPanelComponent implements OnInit {


  //true -> user is actively creating a comment, this means that this is a modal dialogue
  //false -> comment is being displayed in the snippet view
  createMode: boolean;
  @Input() comment: IComment;
  @Input() snippetId: number;
  

  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  deleteComment(): void {
    this.api.deleteComment(this.snippetId, this.comment.id).subscribe(
      x => this.snackbar.showMessage("Deleted comment"),
      err => this.snackbar.showError(err.message)
    )
  }

}
