import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() commentDeleted = new EventEmitter<string>();
  

  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    if (this.comment.isSelected == null)
    {
      this.comment.isSelected = false;
    }
  }

  deleteComment(): void {
    this.api.deleteComment(this.snippetId, this.comment.id).subscribe(
      x => {
        this.snackbar.showMessage("Deleted comment");
        this.commentDeleted.emit('commentDeleted');
      },
      err => this.snackbar.showError(err.message)
    )
  }
}
