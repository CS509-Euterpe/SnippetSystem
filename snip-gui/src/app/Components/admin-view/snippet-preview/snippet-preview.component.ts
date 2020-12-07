import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAccessEnum } from 'src/app/models/enums';
import { Router } from '@angular/router';
import { ISnippet } from 'src/app/models/models';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';


@Component({
  selector: 'app-snippet-preview',
  templateUrl: './snippet-preview.component.html',
  styleUrls: ['./snippet-preview.component.css']
})
export class SnippetPreviewComponent implements OnInit {

  @Input() snippet: ISnippet;

  @Output() snippetDeleted = new EventEmitter<string>(); 
  
  constructor(
    private api: ApiRequestsService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  view(): void {
    this.snackbar.showMessage("going to snippet: " + this.snippet.id);
    this.router.navigateByUrl('snippet/' + this.snippet.id);
  }

  deleteSnip(): void {
    //delete snippet
    this.snackbar.showMessage("deleting snip: " + this.snippet.id)
    this.api.deleteSnippet(this.snippet.id, UserAccessEnum.Admin).subscribe(
      x => {},
      err => {this.snackbar.showError("failed to delete snip")},
      () => {
        this.snackbar.showMessage("done deleting snip")
        this.snippetDeleted.emit('snippetDeleted');
      }
    )
  }

}
