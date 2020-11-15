import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror'
import { LanguageMimeStrings, LanguageTypeEnum, UserAccessEnum } from 'src/app/models/enums';
import { ISnippet, IRegion } from 'src/app/models/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseSnippetComponent } from '../base-snippet/base-snippet-component';

export interface ShareDialog {
  snipUrl: string;
}

@Component({
  selector: 'app-snippet-panel',
  templateUrl: './snippet-panel.component.html',
  styleUrls: ['./snippet-panel.component.css']
})
export class SnippetPanelComponent extends BaseSnippetComponent{

  @Input() snippet: ISnippet;
  @ViewChild(CodemirrorComponent) editor: CodemirrorComponent;

  private _codeMarkers = [];
  panelOpenState = true;

  codeStyleOptions: any = {
    lineNumbers: true,
    styleSelectedText: true,
    theme: 'eclipse',
    mode:''
  }

  constructor(
    public dialog: MatDialog,
    route: ActivatedRoute
  ) {
    super(route)
  }
   
  ngOnInit(): void {
    super.ngOnInit()
    this.setCodeStyle(this.snippet.language)   
  }

  openDialog(): void {
    var d = <ShareDialog> {snipUrl: window.location.origin + '/' + this.route.snapshot.url.join('/')};

    console.log(location)
    const dialogRef = this.dialog.open(ShareModalDialog, {
      width: '500px',
      data: d
    });
  }

  public highlightRegion(region: IRegion)  {
    let marker = this.editor.codeMirror.markText(
      {line: region.startLine, ch: region.startChar},
      {line: region.endLine, ch: region.endChar},
      {className:"editor-comment-region"}
    )
    this._codeMarkers.push(marker)
  }

  public clearHighlighting()
  {
    for(let m of this._codeMarkers)
    {
      m.clear();
    }
  }

  get selection(): IRegion{
    let selections = this.editor.codeMirror.listSelections()
    if (selections.length != 0)
    {
      let region = <IRegion> {
        startLine: selections[0].anchor.line,
        startChar: selections[0].anchor.ch,
        endLine: selections[0].head.line,
        endChar: selections[0].head.ch,
      }
      return region
    }
    return null
  }

  highlight() 
  {
    this.clearHighlighting()
    this.highlightRegion(this.selection)
  }

  onLanguageChanged(language: LanguageTypeEnum): void {
    this.snippet.language = language;
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
export class ShareModalDialog{


  constructor(
    public dialogRef: MatDialogRef<ShareModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ShareDialog
  ){}

  closeClick(): void {
    this.dialogRef.close();
  }
  
}