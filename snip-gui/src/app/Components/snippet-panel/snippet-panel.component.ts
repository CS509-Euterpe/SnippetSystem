import { Component, Input, OnInit, Inject } from '@angular/core';
import { LanguageMimeStrings, LanguageTypeEnum } from 'src/app/models/enums';
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
  @Input() snippet: ISnippet;
  currentLanguage = LanguageTypeEnum.Java;

  codeStyleOptions: any = {
    lineNumbers: true,
    theme: 'eclipse',
    mode:''
  }

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.setCodeStyle(this.currentLanguage)
  }
   
  ngOnInit(): void {
  }

  openDialog(): void {
    var d = <ShareDialog> {snipUrl: window.location.origin + '/' + this.route.snapshot.url.join('/')};

    console.log(location)
    const dialogRef = this.dialog.open(ShareModalDialog, {
      width: '500px',
      data: d
    });
  }

  onLanguageChanged(language: LanguageTypeEnum): void {
    this.currentLanguage = language;
    this.setCodeStyle(language)
  }

  setCodeStyle(language: LanguageTypeEnum): void {
    var mime = LanguageMimeStrings.get(language as LanguageTypeEnum)
    if (mime === undefined){
      mime = LanguageMimeStrings.get(LanguageTypeEnum.None)
    }
    this.codeStyleOptions.mode = LanguageMimeStrings.get(language);
  }

}

/* modal dialog component */
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