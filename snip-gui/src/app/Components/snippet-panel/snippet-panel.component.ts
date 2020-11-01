import { Component, Input, OnInit, Inject } from '@angular/core';
import { ISnippet } from 'src/app/models/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

export interface ShareDialog {
  snipUrl: string;
}


@Component({
  selector: 'app-snippet-panel',
  templateUrl: './snippet-panel.component.html',
  styleUrls: ['./snippet-panel.component.css']
})
export class SnippetPanelComponent implements OnInit {

  panelOpenState = true;
  @Input() snippet: ISnippet

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  openDialog(): void {
    var d = <ShareDialog> {snipUrl: window.location.origin + '/' + this.route.snapshot.url.join('/')};

    console.log(location)
    const dialogRef = this.dialog.open(ShareModalDialog, {
      width: '500px',
      data: d
    });
  }

  ngOnInit(): void {
  }
}

//move direct to other ts file...
@Component({
  selector: 'share-modal',
  templateUrl: 'share-modal.html'
})
export class ShareModalDialog {

  constructor(
    public dialogRef: MatDialogRef<ShareModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ShareDialog
  ){}

  closeClick(): void {
    this.dialogRef.close();
  }
}